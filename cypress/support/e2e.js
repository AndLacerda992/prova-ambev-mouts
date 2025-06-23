// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Configurações globais do Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna false para evitar que o Cypress falhe em erros não capturados
  return false;
});

// Configuração para capturar screenshots em caso de falha
Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
  screenshotOnElementFailure: false
}); 