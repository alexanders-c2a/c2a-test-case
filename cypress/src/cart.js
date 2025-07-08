class cart {

    #userData = {
        Name: "alexander",
        Country: "Israel",
        City: "Nahalat Tzvi",
        CreditCard: "1040205010402050",
        Month: "12",
        Year: "25",
    };

    #elements = {
        deleteBtn: (title) => { return cy.get(".success").contains(title).parent().find("a") },
        placeOrderBtn: () => { return cy.get("button").contains(this.#strings.placeOrderBtn) },
        okButton: () => {return cy.contains('.sa-confirm-button-container', this.#strings.ok).find('button')},
        closeButton: () => {return cy.contains('.modal-header', this.#strings.placeOrder).find('button')}
    };

    #strings = {
        cartNav: "Cart",
        productRow: ".success",
        placeOrderBtn: "Place Order",
        purchaseBtn: "Purchase",
        thankYou: "Thank you for your purchase!",
        ok: 'OK',
        placeOrder: 'Place order',
        close: 'Close'
    };

    #ids = {
        nav: ".nav-link",
        name: "#name",
        country: "#country",
        city: "#city",
        creditCard: "#card",
        month: "#month",
        year: "#year",
        thankYouAlert: ".sweet-alert",
        orderModal: "#orderModal"
    };

    #fillOrderField(filedElementId, value) {
        cy.get(filedElementId).should("be.visible");
        cy.get(filedElementId).type(value);
    }

    #fillOrderForm() {
        this.#fillOrderField(this.#ids.name,this.#userData.Name);
        this.#fillOrderField(this.#ids.country, this.#userData.Country);
        this.#fillOrderField(this.#ids.city, this.#userData.City);
        this.#fillOrderField(this.#ids.creditCard, this.#userData.CreditCard);
        this.#fillOrderField(this.#ids.month, this.#userData.Month);
        this.#fillOrderField(this.#ids.year, this.#userData.Year);
        cy.get("button").contains(this.#strings.purchaseBtn).click();
    }

    #enterCart() {
        cy.get(this.#ids.nav).contains(this.#strings.cartNav).click();
        cy.wait(1000) // wait for the cart to load
    }

    deleteByTitle(title) {
        this.#enterCart();
        this.#elements.deleteBtn(title).click();
        cy.wait(1000);
    }

    verifyDeleteByTitle(title) {
        cy.get("td").contains(title).should("not.exist")
    }

    verifyPurchase() {
        cy.get(this.#ids.thankYouAlert).contains(this.#strings.thankYou);

    }

    closeThankYouPopup() {
        this.#elements.okButton().click();
        this.#elements.closeButton().scrollIntoView().should('be.visible').click();
    }

    #openOrderDialog() {
        this.#elements.placeOrderBtn().scrollIntoView().click();
        cy.get(this.#ids.orderModal).should("be.visible");
        cy.wait(1000)
    }

    placeOrder() {
        this.#openOrderDialog();
        this.#fillOrderForm();
    }
}
module.exports = new cart();