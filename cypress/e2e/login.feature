Feature: Login do Usuário
  Como um usuário do Serverest
  Eu quero fazer login no sistema
  Para acessar as funcionalidades da loja

  Background:
    Given que estou na página de login

  @login
  Scenario: Login com email inválido
    When eu preencho o email "email_invalido@teste.com"
    And eu preencho a senha "teste"
    And eu clico no botão "Entrar"
    Then eu devo ver uma mensagem de erro
    And eu devo permanecer na página de login

  @login
  Scenario: Login com senha inválida
    When eu preencho o email "fulano@qa.com"
    And eu preencho a senha "senha_errada"
    And eu clico no botão "Entrar"
    Then eu devo ver uma mensagem de erro
    And eu devo permanecer na página de login

  @login
  Scenario: Login com campos vazios
    When eu clico no botão "Entrar"
    Then eu devo ver uma mensagem de erro
    And eu devo permanecer na página de login 