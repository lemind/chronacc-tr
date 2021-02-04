describe('Test our main actions', 

  function() {
  context('main', function() {
    beforeEach(() => {
      // ToDo: temp login
      cy.visit(Cypress.config('homePage'))

      const userEmail = Cypress.env('TEST_USER_EMAIL')
      const userPassword = Cypress.env('TEST_USER_PASSWORD')

      cy.get('[data-test="input-email"]').type(userEmail).blur()
      cy.get('[data-test="input-password"]').type(userPassword).blur()

      // ToDo: const
      cy.intercept('https://cube-7-auth.herokuapp.com/api/user/login').as('auth')

      cy.get('[data-test="button-login"]').click()

      cy.wait('@auth')
    })

    afterEach(() => {
      cy.getApiUrl().then(apiUrl => {
        const userEmail = Cypress.env('TEST_USER_EMAIL')

        const testActiveTasksApi = `${apiUrl}/testActiveTasks/${userEmail}`
        cy.log(testActiveTasksApi)
        cy.request('DELETE', testActiveTasksApi)
      })
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
    })

    it('time element exist after start clicked', function() {
      cy.get('[data-test="button-start"]').click()
      cy.get('[data-test="timer-time"]').should('exist')
    })
  })
})
