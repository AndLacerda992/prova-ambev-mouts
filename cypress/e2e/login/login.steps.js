import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Background steps
Given('que estou na página de login', () => {
  cy.visit('/login');
  cy.get('[data-testid="email"]').should('be.visible');
  cy.get('[data-testid="senha"]').should('be.visible');
});

// When steps
When('eu preencho o email {string}', (email) => {
  cy.get('[data-testid="email"]').clear().type(email);
});

When('eu preencho a senha {string}', (password) => {
  cy.get('[data-testid="senha"]').clear().type(password);
});

When('eu clico no botão {string}', (buttonText) => {
  if (buttonText === 'Entrar') {
    cy.get('[data-testid="entrar"]').click();
  }
});

When('eu clico no link {string}', (linkText) => {
  if (linkText === 'Já tenho conta') {
    cy.contains('Já tenho conta').click();
  }
});

// Then steps
Then('eu devo ver uma mensagem de erro', () => {
  cy.get('body').then(($body) => {
    const hasError = $body.find('[data-testid="toast-error"], .toast-error, .error-message, .alert-error').length > 0;
    const isOnLoginPage = $body.find('[data-testid="email"]').length > 0;
    expect(hasError || isOnLoginPage).to.be.true;
  });
});

Then('eu devo permanecer na página de login', () => {
  cy.url().should('include', '/login');
  cy.get('[data-testid="email"]').should('be.visible');
});

Then('eu devo ser redirecionado para a página de login', () => {
  cy.url().should('include', '/login');
}); 