/// <reference types="cypress" />
const produtos= require('../fixtures/produtos.json')
const faker = require('faker');



context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('produtos')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        cy.fixture('produtos').then((Dados) => {
          Dados.produtos.forEach(produto => {
            cy.addProdutoCarrinho(produto)
          })


          cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
          cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click();
          cy.get('.order-total > td').should('contain', 'R$214,50')
        .then(()=> {

        const informacoesCadastro = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                company: faker.company.companyName(),
                country: 'Brazil',  
                address1: faker.address.streetAddress(),
                address2: faker.address.secondaryAddress(),
                city: faker.address.city(),
                state: 'São Paulo', 
                postcode: faker.address.zipCode(),
                phone: faker.phone.phoneNumber(),
                email: faker.internet.email()
            };


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
          cy.wait(8000);
          cy.get('.woocommerce-notice').should('exist')
          });
        });
     });
 });