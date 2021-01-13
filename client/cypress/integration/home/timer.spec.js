describe('Test our main actions', 

  function() {
  context('main', function() {
    before(() => {
      // ToDo: temp login
      cy.visit(Cypress.config('homePage'))

      const userEmail = 'test@test.com'
      const userPassword = 'test'

      cy.get('[data-test="input-email"]').type(userEmail).blur()
      cy.get('[data-test="input-password"]').type(userPassword).blur()

      // ToDo: const
      cy.intercept('https://cube-7-auth.herokuapp.com/api/user/login').as('auth')

      cy.get('[data-test="button-login"]').click()

      cy.wait('@auth')
    })

    it('app el exist', function() {
      cy.get('[data-test="app"]').should('exist')
    })

    it('button start exist', function() {
      cy.get('[data-test="button-start"]').should('exist')
    })

    it('button stop does not exist', function() {
      cy.get('[data-test="button-stop"]').should('not.exist')
    })

    it('stop button shown after start clicked', function() {
      cy.get('[data-test="button-start"]').click()
      cy.get('[data-test="button-stop"]').should('exist')
      cy.get('[data-test="button-stop"]').click()
    })
  })
})
