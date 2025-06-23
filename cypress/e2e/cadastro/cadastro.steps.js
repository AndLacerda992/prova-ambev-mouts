import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Background steps
Given('que estou na página de cadastro', () => {
  cy.visit('/cadastrarusuarios');
  // Aguarda a página carregar completamente
  cy.get('body').should('be.visible');
  // Aguarda um pouco mais para garantir que todos os elementos estejam carregados
  cy.wait(3000);
  // Verifica se a página carregou corretamente (não é uma página de erro)
  cy.get('body').should('not.contain', '404').and('not.contain', 'Not Found');
});

// When steps
When('eu preencho o nome {string}', (name) => {
  cy.get('[data-testid="nome"]').should('be.visible').clear().type(name);
});

When('eu preencho o email {string}', (email) => {
  let userEmail = email;
  if (email.toLowerCase() === 'email_aleatorio') {
    userEmail = `teste.user.${Date.now()}@qa.com`;
  }
  cy.get('[data-testid="email"]').should('be.visible').clear().type(userEmail);
});

When('eu preencho a senha {string}', (password) => {
  cy.get('[data-testid="password"]').should('be.visible').clear().type(password);
});

When('eu clico no botão {string}', (buttonText) => {
  if (buttonText === 'Cadastrar') {
    cy.get('[data-testid="cadastrar"]').should('be.visible').click();
  }
});

When('eu clico no link {string}', (linkText) => {
  if (linkText === 'Já tenho conta') {
    // O link real é "Entrar", não "Já tenho conta"
    cy.contains('a', 'Entrar').should('be.visible').click();
  }
});

// Then steps
Then('eu devo ser redirecionado para a página de login', () => {
  cy.url().should('satisfy', (url) => url.includes('/login') || url.includes('/home'));
});

Then('eu devo ver uma mensagem de erro informando que o email já existe', () => {
  cy.wait(5000);
  cy.get('body').should('contain.text', 'Este email já está sendo usado');
});

Then('eu devo ver mensagens de erro para os campos obrigatórios', () => {
  cy.wait(5000);
  cy.get('body').should('contain.text', 'Nome é obrigatório');
});

Then('eu devo permanecer na página de cadastro', () => {
  cy.url().should('include', '/cadastrarusuarios');
}); 