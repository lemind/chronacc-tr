describe('Test auth', function() {
  context('auth', function() {
    it('auth form exist', function() {
      cy.visit(Cypress.config('homePage'))

      cy.get('[data-test="login-form"]').should('exist')
    })

    it('auth inputs exist', function() {
      cy.visit(Cypress.config('homePage'))

      cy.get('[data-test="input-email"]').should('exist')
      cy.get('[data-test="input-password"]').should('exist')
    })

    it('auth with test user', function() {
      cy.visit(Cypress.config('homePage'))
      const userEmail = Cypress.env('TEST_USER_EMAIL')
      const userPassword = Cypress.env('TEST_USER_PASSWORD')

      cy.get('[data-test="label-email"]').should('not.exist')

      cy.get('[data-test="input-email"]').type(userEmail).blur()
      cy.get('[data-test="input-password"]').type(userPassword).blur()

      // ToDo: const
      cy.intercept('https://cube-7-auth.herokuapp.com/api/user/login').as('auth')

      cy.get('[data-test="button-login"]').click()

      cy.wait('@auth').then((interception) => {
        cy.get('[data-test="label-email"]').contains(userEmail)
      })
    })
  })
})