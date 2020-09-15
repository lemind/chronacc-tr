describe('Test our main actions', function() {
  context('main', function() {
    it('app el exist', function() {
      cy.visit(Cypress.config('homePage'))

      cy.get('[data-test="app"]').should('exist')
    })

    it('button start exist', function() {
      cy.visit(Cypress.config('homePage'))

      cy.get('[data-test="button-start"]').should('exist')
    })

    it('button stop does not exist', function() {
      cy.visit(Cypress.config('homePage'))

      cy.get('[data-test="button-stop"]').should('not.exist')
    })

    it('stop button shown after start clicked', function() {
      cy.visit(Cypress.config('homePage'))

      cy.get('[data-test="button-start"]').click()
      cy.get('[data-test="button-stop"]').should('exist')
      cy.get('[data-test="button-stop"]').click()
    })
  })
})
