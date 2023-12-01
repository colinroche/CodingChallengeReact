describe('Submit button check', () => {
  it('Should submit the form and display the correct country details', () => {
    cy.visit('https://coding-challenge-react-frontend.vercel.app/')

    // Ireland as input field
    const inputText = 'Ireland'
    cy.get('input[type="text"]').type(inputText).should('have.value', inputText)

    // Click the submit button
    cy.get('button[type="submit"]').click()


    // Check to see if the correct country details appear
    cy.get('h2').contains('Official Name: Republic of Ireland').should('be.visible')
    cy.get('h2').contains('Common Name: Ireland').should('be.visible')
    cy.get('h2').contains('Capital: Dublin').should('be.visible')
    cy.get('h2').contains('Region: Europe').should('be.visible')
  })
})