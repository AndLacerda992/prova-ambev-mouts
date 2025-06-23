describe('Debug Messages on Cadastro Page', () => {
  it('should capture success and error messages', () => {
    cy.visit('/cadastrarusuarios');
    cy.wait(3000);
    
    // Teste 1: Cadastro com dados válidos para capturar mensagem de sucesso
    cy.get('[data-testid="nome"]').type('Teste Usuario');
    cy.get('[data-testid="email"]').type('teste.usuario@teste.com');
    cy.get('[data-testid="password"]').type('senha123');
    cy.get('[data-testid="cadastrar"]').click();
    
    // Aguarda e captura mensagem de sucesso
    cy.wait(5000);
    cy.get('body').then(($body) => {
      // Captura todos os elementos que podem conter mensagens
      const allElements = $body.find('*');
      const messageElements = [];
      
      allElements.each((index, element) => {
        const text = element.textContent?.trim();
        if (text && (text.includes('sucesso') || text.includes('cadastrado') || text.includes('criado') || 
                     text.includes('error') || text.includes('erro') || text.includes('inválido'))) {
          messageElements.push({
            tag: element.tagName,
            id: element.id,
            className: element.className,
            'data-testid': element.getAttribute('data-testid'),
            text: text,
            innerHTML: element.innerHTML.substring(0, 200)
          });
        }
      });
      
      cy.writeFile('cypress/fixtures/success-message.json', messageElements);
    });
    
    cy.screenshot('success-message-capture');
  });
  
  it('should capture error messages', () => {
    cy.visit('/cadastrarusuarios');
    cy.wait(3000);
    
    // Teste 2: Cadastro com email já existente para capturar mensagem de erro
    cy.get('[data-testid="nome"]').type('Teste Erro');
    cy.get('[data-testid="email"]').type('fulano@qa.com'); // Email já existente
    cy.get('[data-testid="password"]').type('senha123');
    cy.get('[data-testid="cadastrar"]').click();
    
    // Aguarda e captura mensagem de erro
    cy.wait(5000);
    cy.get('body').then(($body) => {
      // Captura todos os elementos que podem conter mensagens
      const allElements = $body.find('*');
      const messageElements = [];
      
      allElements.each((index, element) => {
        const text = element.textContent?.trim();
        if (text && (text.includes('error') || text.includes('erro') || text.includes('já existe') || 
                     text.includes('inválido') || text.includes('falhou'))) {
          messageElements.push({
            tag: element.tagName,
            id: element.id,
            className: element.className,
            'data-testid': element.getAttribute('data-testid'),
            text: text,
            innerHTML: element.innerHTML.substring(0, 200)
          });
        }
      });
      
      cy.writeFile('cypress/fixtures/error-message.json', messageElements);
    });
    
    cy.screenshot('error-message-capture');
  });
}); 