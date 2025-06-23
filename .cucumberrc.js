module.exports = {
  stepDefinitions: [
    'cypress/e2e/step_definitions/**/*.js',
    'cypress/e2e/**/*.steps.js'
  ],
  html: {
    enabled: true,
    output: 'cypress/reports/cucumber-html/cucumber-report.html'
  },
  json: {
    enabled: true,
    output: 'cypress/reports/cucumber-json/cucumber-report.json'
  }
}; 