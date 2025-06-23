describe('Debug Cadastro Page', () => {
  it('should inspect the cadastro page structure', () => {
    cy.visit('/cadastrarusuarios');
    cy.wait(3000);
    
    let pageInfo = {
      title: '',
      inputs: [],
      buttons: [],
      links: []
    };
    
    // Get page title
    cy.title().then(title => {
      pageInfo.title = title;
    });
    
    // Get all input elements
    cy.get('input').then($inputs => {
      $inputs.each((index, element) => {
        pageInfo.inputs.push({
          index: index,
          type: element.type,
          name: element.name,
          id: element.id,
          placeholder: element.placeholder,
          'data-testid': element.getAttribute('data-testid'),
          value: element.value
        });
      });
    });
    
    // Get all buttons
    cy.get('button').then($buttons => {
      $buttons.each((index, element) => {
        pageInfo.buttons.push({
          index: index,
          text: element.textContent.trim(),
          type: element.type,
          id: element.id,
          'data-testid': element.getAttribute('data-testid')
        });
      });
    });
    
    // Get all links
    cy.get('a').then($links => {
      $links.each((index, element) => {
        pageInfo.links.push({
          index: index,
          text: element.textContent.trim(),
          href: element.href,
          id: element.id
        });
      });
    });
    
    // Save to file
    cy.writeFile('cypress/fixtures/page-structure.json', pageInfo);
    
    // Take a screenshot
    cy.screenshot('cadastro-page-structure');
  });
}); 