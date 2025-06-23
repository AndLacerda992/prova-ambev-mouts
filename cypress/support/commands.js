// Comandos customizados para o projeto Serverest

// Comando para fazer login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="senha"]').type(password);
  cy.get('[data-testid="entrar"]').click();
});

// Comando para fazer logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout"]').click();
});

// Comando para verificar se está logado
Cypress.Commands.add('isLoggedIn', () => {
  cy.get('body').should('contain', 'Bem-vindo');
});

// Comando para verificar mensagem de sucesso
Cypress.Commands.add('checkSuccessMessage', (message) => {
  cy.get('[data-testid="toast-success"]').should('contain', message);
});

// Comando para verificar mensagem de erro
Cypress.Commands.add('checkErrorMessage', (message) => {
  cy.get('[data-testid="toast-error"]').should('contain', message);
});

// ===== COMANDOS PARA TESTES DE API =====

// Comando para gerar dados aleatórios
Cypress.Commands.add('generateRandomData', (type) => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(7);
  
  switch (type) {
    case 'user':
      return {
        nome: `Usuário Teste ${randomId}`,
        email: `teste${timestamp}@api.com`,
        password: 'senha123',
        administrador: 'false'
      };
    case 'product':
      return {
        nome: `Produto Teste ${randomId}`,
        preco: Math.floor(Math.random() * 1000) + 1,
        descricao: `Descrição do produto teste ${randomId}`,
        quantidade: Math.floor(Math.random() * 100) + 1
      };
    default:
      return {};
  }
});

// Comando para fazer login via API
Cypress.Commands.add('apiLogin', (email, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/login',
    body: { email, password }
  });
});

// Comando para cadastrar usuário via API
Cypress.Commands.add('apiCreateUser', (userData) => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/usuarios',
    body: userData
  });
});

// Comando para cadastrar produto via API
Cypress.Commands.add('apiCreateProduct', (productData, token) => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/produtos',
    headers: {
      'Authorization': token
    },
    body: productData
  });
});

// Comando para buscar produto via API
Cypress.Commands.add('apiGetProduct', (productId, token) => {
  return cy.request({
    method: 'GET',
    url: `https://serverest.dev/produtos/${productId}`,
    headers: {
      'Authorization': token
    }
  });
});

// Comando para atualizar produto via API
Cypress.Commands.add('apiUpdateProduct', (productId, productData, token) => {
  return cy.request({
    method: 'PUT',
    url: `https://serverest.dev/produtos/${productId}`,
    headers: {
      'Authorization': token
    },
    body: productData
  });
});

// Comando para deletar produto via API
Cypress.Commands.add('apiDeleteProduct', (productId, token) => {
  return cy.request({
    method: 'DELETE',
    url: `https://serverest.dev/produtos/${productId}`,
    headers: {
      'Authorization': token
    }
  });
});

// Comando para criar carrinho via API
Cypress.Commands.add('apiCreateCart', (cartData, token) => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/carrinhos',
    headers: {
      'Authorization': token
    },
    body: cartData
  });
});

// Comando para verificar status da resposta
Cypress.Commands.add('expectStatus', (statusCode) => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(statusCode);
  });
});

// Comando para verificar propriedades da resposta
Cypress.Commands.add('expectResponseProperty', (property) => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.have.property(property);
  });
});

// Comando para verificar mensagem de erro
Cypress.Commands.add('expectErrorMessage', (expectedMessage) => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body.message).to.include(expectedMessage);
  });
}); 