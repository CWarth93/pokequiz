describe('game e2e', () => {
  it('should play a game', () => {
    cy.visit('/')
      .get('#name-input')
      .type('Cypresstester')
      .get('#start-button')
      .click()
      .get('.pokemon:nth-of-type(1)', { timeout: 20000 })
      .click()
      .get('.pokemon:nth-of-type(2)', { timeout: 2000 })
      .click()
      .get('.pokemon:nth-of-type(1)', { timeout: 2000 })
      .click()
      .get('.pokemon:nth-of-type(2)', { timeout: 2000 })
      .click()
      .get('.pokemon:nth-of-type(2)', { timeout: 2000 })
      .click()
      .get('.pokemon:nth-of-type(1)', { timeout: 2000 })
      .click()
      .get('.pokemon:nth-of-type(1)', { timeout: 2000 })
      .click()
      .get('.pokemon:nth-of-type(1)', { timeout: 2000 })
      .click()
      .get('.pokemon:nth-of-type(2)', { timeout: 2000 })
      .click()
      .get('.pokemon:nth-of-type(1)', { timeout: 2000 })
      .click()
      .get('.pokemon:nth-of-type(2)', { timeout: 2000 })
      .click()
      .get('.pokemon:nth-of-type(1)', { timeout: 2000 })
      .click()
      .get('.pokemon:nth-of-type(1)', { timeout: 2000 })
      .click()
      .get('.pokemon:nth-of-type(2)', { timeout: 2000 })
      .click()
      .get('.pokemon:nth-of-type(1)', { timeout: 2000 })
      .click()
      .get('#score-text', { timeout: 6000 })
      .should('be.visible');
  });
});
