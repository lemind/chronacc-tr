describe('Test list actions', 

  function() {
  context('list', function() {
    before(() => {
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

    it('list el exist', function() {
      cy.get('[data-test="tasks-list"]').should('exist')
    })

    it('item with desc added', function() {
      const taskDesc = 'task description'
      cy.get('[data-test="button-start"]').click()
      cy.get('[data-test="input-desc"]').type(taskDesc).blur()
      cy.get('[data-test="button-stop"]').click()

      cy.get('[data-test="tasks-list-item"]')
        .first()
        .get('[data-test="tasks-list-item-desc"]')
        .contains(taskDesc)
    })

    it('start old same day task with same desc', function() {
      const firstTaskDesc = 'first task description'
      const secondTaskDesc = 'second task description'

      cy.get('[data-test="button-start"]').click()
      cy.get('[data-test="input-desc"]').type(firstTaskDesc).blur()
      cy.wait(500)
      cy.get('[data-test="button-stop"]').click()

      cy.get('[data-test="button-start"]').click()
      cy.get('[data-test="input-desc"]').type(secondTaskDesc).blur()
      cy.wait(500)

      cy.get('[data-test="tasks-list-item"]')
        .eq(1)
        .get('[data-test="tasks-list-item-button-continue"]')
        .first()
        .click()
      // ToDo: await for real req is ness here?
      cy.wait(500)

      cy.get('[data-test="tasks-list-item"]')
        .first()
        .get('[data-test="tasks-list-item-desc"]')
        .contains(firstTaskDesc)

      cy.get('[data-test="button-stop"]').click()
    })
  })
})