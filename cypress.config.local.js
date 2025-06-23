 const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false, // Desabilita vídeos em desenvolvimento
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 15000, // Aumenta timeout para desenvolvimento
    requestTimeout: 15000,
    responseTimeout: 15000,
    // Configurações para desenvolvimento
    watchForFileChanges: true,
    experimentalStudio: true, // Habilita gravação de comandos
    // Configurações de retry
    retries: {
      runMode: 1,
      openMode: 0
    }
  },
}); 