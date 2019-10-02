function add (a, b) {
  return a + b
}

function subtract (a, b) {
  return a - b
}

function divide (a, b) {
  return a / b
}

function multiply (a, b) {
  return a * b
}
// -- End: Our Application Code --

// -- Start: Our Cypress Tests --
describe('Unit test our math functions', function() {
  context('math', function() {
    it('app el exist', function() {
      cy.visit('localhost:8090')

      cy.get('[data-test="app"]').should('exist')
    })

    it('button start exist', function() {
      cy.visit('localhost:8090')

      cy.get('[data-test="button-start"]').should('exist')
    })

    it('button stop does not exist', function() {
      cy.visit('localhost:8090')

      cy.get('[data-test="button-stop"]').should('not.exist')
    })

    it('stop button shown after start clicked', function() {
      cy.visit('localhost:8090')

      cy.get('[data-test="button-start"]').click()
      cy.get('[data-test="button-stop"]').should('exist')
    })

    it('can subtract numbers', function() {
      expect(subtract(5, 12)).to.eq(-7)
    })

    specify('can divide numbers', function() {
      expect(divide(27, 9)).to.eq(3)
    })

    specify('can multiply numbers', function() {
      expect(multiply(5, 4)).to.eq(20)
    })
  })
})