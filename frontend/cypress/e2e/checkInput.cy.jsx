describe('Check the text input', () => {
  it('check input is working', () => {
    cy.visit('https://coding-challenge-react-frontend.vercel.app/')

    // Testing Ireland as input field
    const inputText = 'Ireland'
    cy.get('input[type="text"]').type(inputText).should('have.value', inputText)
  })
})