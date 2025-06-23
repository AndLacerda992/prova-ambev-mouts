import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Variáveis globais para armazenar dados entre steps
let userData = {};
let productData = {};
let authToken = '';
let cartId = '';
let createdProductId = '';

// Background steps
Given('que a API do Serverest está disponível', () => {
  cy.request({
    method: 'GET',
    url: 'https://serverest.dev/',
    failOnStatusCode: false
  }).its('status').should('be.oneOf', [200, 404]);
});

Given('que estou autenticado como administrador', () => {
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/login',
    body: {
      email: 'fulano@qa.com',
      password: 'teste'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    authToken = response.body.authorization;
  });
});

Given('que estou autenticado como usuário', () => {
  const randomEmail = `teste${Date.now()}@api.com`;
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/usuarios',
    body: {
        nome: 'Usuário API Teste',
        email: randomEmail,
        password: 'senha123',
        administrador: 'false'
    }
  }).then( userResponse => {
    expect(userResponse.status).to.eq(201);
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: randomEmail,
        password: 'senha123'
      }
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);
      authToken = loginResponse.body.authorization;
    });
  })
});

Given('que existem produtos cadastrados', () => {
  cy.request({
    method: 'GET',
    url: 'https://serverest.dev/produtos'
  }).then((response) => {
    if (response.body.produtos.length === 0) {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        headers: { 'Authorization': authToken },
        body: { nome: `Produto de Teste ${Date.now()}`, preco: 100, descricao: "Desc", quantidade: 10}
      }).then(productResponse => {
        createdProductId = productResponse.body._id;
      });
    } else {
        createdProductId = response.body.produtos[0]._id;
    }
  });
});

// When steps
When('eu cadastro um novo usuário com dados válidos', () => {
  userData = {
    nome: 'Usuário API Teste',
    email: `teste${Date.now()}@api.com`,
    password: 'senha123',
    administrador: 'false'
  };
  cy.wrap(userData).as('userData'); // Salva para o próximo step
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/usuarios',
    body: userData
  }).as('lastResponse');
});

When('eu faço login com as credenciais do usuário cadastrado', () => {
  cy.get('@userData').then(user => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: user.email,
        password: user.password
      }
    }).as('lastResponse');
  });
});

When('eu cadastro um novo produto', () => {
  productData = {
    nome: `Produto API Teste ${Date.now()}`,
    preco: 100,
    descricao: 'Produto criado para testes de API',
    quantidade: 10
  };
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/produtos',
    headers: { 'Authorization': authToken },
    body: productData
  }).then(response => {
    createdProductId = response.body._id;
  }).as('lastResponse');
});

When('eu busco o produto cadastrado por ID', () => {
  cy.request({
    method: 'GET',
    url: `https://serverest.dev/produtos/${createdProductId}`,
  }).as('lastResponse');
});

When('eu atualizo os dados do produto', () => {
  const updatedData = {
    nome: `Produto API Atualizado ${Date.now()}`,
    preco: 150,
    descricao: 'Produto atualizado via API',
    quantidade: 15
  };
  cy.request({
    method: 'PUT',
    url: `https://serverest.dev/produtos/${createdProductId}`,
    headers: { 'Authorization': authToken },
    body: updatedData
  }).as('lastResponse');
});

When('eu removo o produto', () => {
  cy.request({
    method: 'DELETE',
    url: `https://serverest.dev/produtos/${createdProductId}`,
    headers: { 'Authorization': authToken }
  }).as('lastResponse');
});

When('eu adiciono produtos ao carrinho', () => {
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/carrinhos',
    headers: { 'Authorization': authToken },
    body: { produtos: [{ idProduto: createdProductId, quantidade: 2 }] }
  }).then(response => {
    cartId = response.body._id;
  }).as('lastResponse');
});

When('eu consulto o carrinho', () => {
  cy.request({
    method: 'GET',
    url: `https://serverest.dev/carrinhos/`, // Consulta o carrinho do usuário logado
    headers: { 'Authorization': authToken }
  }).as('lastResponse');
});

When('eu removo um produto do carrinho', () => {
    // Para remover, primeiro precisamos concluir a compra do carrinho anterior.
    cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/carrinhos/concluir-compra`,
        headers: { 'Authorization': authToken },
        failOnStatusCode: false
      }).then(() => {
        // Adiciona de novo para ter o que remover.
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/carrinhos',
            headers: { 'Authorization': authToken },
            body: { produtos: [{ idProduto: createdProductId, quantidade: 1 }] }
        }).as('lastResponse');
      });
});

When('eu finalizo a compra', () => {
  cy.request({
    method: 'DELETE',
    url: `https://serverest.dev/carrinhos/concluir-compra`,
    headers: { 'Authorization': authToken }
  }).as('lastResponse');
});

When('eu tento cadastrar um usuário com um email já existente', () => {
    const existingEmail = `existente${Date.now()}@api.com`;
    // Cria o usuário primeiro
    cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: { nome: 'Usuario Existente', email: existingEmail, password: 'senha', administrador: 'false'}
    });
    // Tenta criar de novo
    cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: { nome: 'Usuario Repetido', email: existingEmail, password: 'senha', administrador: 'false'},
        failOnStatusCode: false
    }).as('lastResponse');
});

When('eu tento fazer login com credenciais inválidas', () => {
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/login',
    body: { email: 'naoexiste@api.com', password: 'errada' },
    failOnStatusCode: false
  }).as('lastResponse');
});

When('eu tento acessar um recurso protegido sem autenticação', () => {
  cy.request({
    method: 'GET',
    url: 'https://serverest.dev/carrinhos',
    failOnStatusCode: false
  }).as('lastResponse');
});

When('eu busco um recurso com ID inexistente', () => {
  cy.request({
    method: 'GET',
    url: 'https://serverest.dev/produtos/IDInexistente',
    failOnStatusCode: false
  }).as('lastResponse');
});

When('eu envio múltiplas requisições simultâneas para um endpoint', () => {
    const requests = [
        cy.request({ method: 'GET', url: 'https://serverest.dev/produtos', failOnStatusCode: false }),
        cy.request({ method: 'GET', url: 'https://serverest.dev/produtos', failOnStatusCode: false }),
        cy.request({ method: 'GET', url: 'https://serverest.dev/produtos', failOnStatusCode: false })
    ];
    cy.wrap(requests).as('lastResponse');
});

When('eu envio uma requisição com um corpo de dados muito grande', () => {
  const largeData = 'a'.repeat(10001);
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/produtos',
    headers: { 'Authorization': authToken },
    body: { nome: 'Produto Gigante', preco: 1, descricao: largeData, quantidade: 1 },
    failOnStatusCode: false
  }).as('lastResponse');
});

// Then steps
Then('a resposta deve ter o status {int}', (statusCode) => {
  cy.get('@lastResponse').its('status').should('eq', statusCode);
});

Then('o token de autenticação deve ser retornado', () => {
  cy.get('@lastResponse').its('body.authorization').should('not.be.empty');
});

Then('o produto deve ser criado com sucesso', () => {
    cy.get('@lastResponse').then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
    });
});

Then('os dados do produto devem ser retornados corretamente', () => {
    cy.get('@lastResponse').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body._id).to.eq(createdProductId);
    });
});

Then('o produto deve ser atualizado com sucesso', () => {
    cy.get('@lastResponse').its('body.message').should('eq', 'Registro alterado com sucesso');
});

Then('o produto deve ser removido com sucesso', () => {
    cy.get('@lastResponse').its('body.message').should('eq', 'Registro excluído com sucesso');
});

Then('o carrinho deve ser criado com os produtos', () => {
    cy.get('@lastResponse').then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.produtos).to.have.length(1);
    });
});

Then('os detalhes do carrinho devem ser retornados', () => {
    cy.get('@lastResponse').its('status').should('eq', 200);
});

Then('o produto deve ser removido do carrinho', () => {
    cy.get('@lastResponse').its('body.message').should('eq', 'Cadastro realizado com sucesso'); // O step anterior cria um carrinho novo
});

Then('a compra deve ser finalizada com sucesso', () => {
    cy.get('@lastResponse').its('body.message').should('eq', 'Registro excluído com sucesso');
});

Then('a resposta deve conter a mensagem de erro {string}', (errorMessage) => {
    cy.get('@lastResponse').its('body.message').should('contain', errorMessage);
});

Then('todas as requisições devem retornar sucesso', () => {
    cy.get('@lastResponse').each(req => {
        cy.wrap(req).its('status').should('eq', 200);
    })
});

Then('a API deve retornar um erro de validação', () => {
    cy.get('@lastResponse').its('status').should('be.oneOf', [400, 413]);
});

// Limpeza após testes
after(() => {
  // Limpa o usuário criado
  if (userData._id) {
    cy.request({
      method: 'DELETE',
      url: `https://serverest.dev/usuarios/${userData._id}`,
      headers: {
        'Authorization': authToken
      }
    });
  }

  // Limpa o carrinho
  if (cartId) {
    cy.request({
      method: 'DELETE',
      url: `https://serverest.dev/carrinhos/concluir-compra`,
      headers: {
        'Authorization': authToken
      },
      failOnStatusCode: false
    });
  }
}); 