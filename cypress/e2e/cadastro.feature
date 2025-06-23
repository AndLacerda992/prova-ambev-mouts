Feature: Cadastro de Usuário
  Como um novo usuário
  Eu quero me cadastrar no Serverest
  Para ter acesso às funcionalidades da loja

  Background:
    Given que estou na página de cadastro

  @smoke @cadastro
  Scenario: Cadastro com dados válidos
    When eu preencho o nome "João Silva"
    And eu preencho o email "email_aleatorio"
    And eu preencho a senha "senha123"
    And eu clico no botão "Cadastrar"
    Then eu devo ser redirecionado para a página de login

  @cadastro
  Scenario: Cadastro com email já existente
    When eu preencho o nome "Maria Santos"
    And eu preencho o email "fulano@qa.com"
    And eu preencho a senha "senha123"
    And eu clico no botão "Cadastrar"
    Then eu devo ver uma mensagem de erro informando que o email já existe

  @cadastro
  Scenario: Cadastro com campos obrigatórios vazios
    When eu clico no botão "Cadastrar"
    Then eu devo ver mensagens de erro para os campos obrigatórios
    And eu devo permanecer na página de cadastro

  @cadastro
  Scenario: Navegação para página de login
    When eu clico no link "Já tenho conta"
    Then eu devo ser redirecionado para a página de login 