Feature: Testes de API Serverest
  Como um desenvolvedor/testador
  Eu quero testar as funcionalidades da API do Serverest
  Para garantir que os endpoints estão funcionando corretamente

  Background:
    Given que a API do Serverest está disponível

  @api @smoke
  Scenario: Cadastrar usuário e fazer login
    When eu cadastro um novo usuário com dados válidos
    Then a resposta deve ter o status 201
    And o token de autenticação deve ser retornado
    When eu faço login com as credenciais do usuário cadastrado
    Then a resposta deve ter o status 200

  @api
  Scenario: Gerenciar produtos (CRUD completo)
    Given que estou autenticado como administrador
    When eu cadastro um novo produto
    Then o produto deve ser criado com sucesso
    When eu busco o produto cadastrado por ID
    Then os dados do produto devem ser retornados corretamente
    When eu atualizo os dados do produto
    Then o produto deve ser atualizado com sucesso
    When eu removo o produto
    Then o produto deve ser removido com sucesso

  @api
  Scenario: Gerenciar carrinho de compras
    Given que estou autenticado como usuário
    And que existem produtos cadastrados
    When eu adiciono produtos ao carrinho
    Then o carrinho deve ser criado com os produtos
    When eu consulto o carrinho
    Then os detalhes do carrinho devem ser retornados
    When eu removo um produto do carrinho
    Then o produto deve ser removido do carrinho
    When eu finalizo a compra
    Then a compra deve ser finalizada com sucesso

  @api
  Scenario: Validações e tratamento de erros
    When eu tento cadastrar um usuário com um email já existente
    Then a resposta deve ter o status 400
    And a resposta deve conter a mensagem de erro "Este email já está sendo usado"
    When eu tento fazer login com credenciais inválidas
    Then a resposta deve ter o status 401
    And a resposta deve conter a mensagem de erro "Email e/ou senha inválidos"
    When eu tento acessar um recurso protegido sem autenticação
    Then a resposta deve ter o status 401
    And a resposta deve conter a mensagem de erro "Token de acesso ausente"
    When eu busco um recurso com ID inexistente
    Then a resposta deve ter o status 404
    And a resposta deve conter a mensagem de erro "Produto não encontrado"

  @api
  Scenario: Testes de performance e limites
    Given que estou autenticado como administrador
    When eu envio múltiplas requisições simultâneas para um endpoint
    Then todas as requisições devem retornar sucesso
    When eu envio uma requisição com um corpo de dados muito grande
    Then a API deve retornar um erro de validação 