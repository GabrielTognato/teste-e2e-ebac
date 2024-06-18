
Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('addProdutoCarrinho', (produto) => {
    cy.get('.products > .row').contains(produto.Nome).click()
    cy.get('#tab-description > :nth-child(1)').should ('exist')
    cy.get(`.button-variable-item-${produto.Size}`).click()
    cy.get(`.button-variable-item-${produto.Color}`).click() 
    cy.get('.single_add_to_cart_button').click()
    cy.get('#primary-menu > .menu-item-629 > a').click()
   
});

Cypress.Commands.add('preencherEndereço', (informacoesCadastro) => {
    cy.get('#billing_first_name').type(informacoesCadastro.firstName)
    cy.get('#billing_last_name').type(informacoesCadastro.lastName)
    cy.get('#billing_company').type(informacoesCadastro.company)
    cy.get('#select2-billing_country-container').click().type(`${informacoesCadastro.country}{enter}`)
    cy.get('#billing_address_1').type(informacoesCadastro.address1, {force: true});
    cy.get('#billing_address_2').type(informacoesCadastro.address2)
    cy.get('#billing_city').type(informacoesCadastro.city)
    cy.get('#select2-billing_state-container').click().type(`${informacoesCadastro.state}{enter}`)
    cy.get('#billing_postcode').type('09190000')
    cy.get('#billing_phone').type('11973238031')
    cy.get('#billing_email').type(informacoesCadastro.email)
    cy.get('#createaccount').click()
    cy.get('#account_password').type('Ebacteste123',  {log: false})
    cy.get('#terms').click()
    cy.get('#place_order').click()
    
});

Cypress.Commands.add('clicarCheckout', () => {
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout')
    .as('BotaoCheckout').click()



})


    


