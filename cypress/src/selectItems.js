class selectItems {
    #cheapestPrice = 360;
    #pagesCount = 0;
    #strings = {
        phoneMenu: "Phones",
        laptopMenu: "Laptops",
        monitorMenu: "Monitors",
        cheapPhoneTitle: ""

    };
    #ids = {
        nextBtn: "#next2",
    };
    #selectors = {
        cardClass: ".card-block",
        priceSelector: "h5",
        homeBtnClass: ".nav-link",
        addToCartBtn: 'a[onclick^="addToCart"]',
        phonesBtnDemo: "a[onclick='byCat('phone')']",
        deviceBtn: ".list-group-item"
    };
    #elements = {
        itemCard: () => { return cy.get(this.#selectors.cardClass) },
        nextBtn: () => {
            return cy.get(this.#ids.nextBtn)
        },
        homeBtn: () => { return cy.get(this.#selectors.homeBtnClass).first() },
        addToCartBtn: () => { return cy.get(this.#selectors.addToCartBtn) },
        phonesBtn: () => { return cy.get(this.#selectors.deviceBtn).contains(this.#strings.phoneMenu) },
        laptopBtn: () => { return cy.get(this.#selectors.deviceBtn).contains(this.#strings.laptopMenu) },
        monitorBtn: () => { return cy.get(this.#selectors.deviceBtn).contains(this.#strings.monitorMenu) }
    };
    
    async #enterCheapest() {   //i tryed to do search in all the pages, but i had problems and hadn't enough time to fix it, so i search for cheapest and most expensive products only in the first page
        var cheapestPrice = Number.MAX_SAFE_INTEGER;

        cy.get(this.#selectors.cardClass).each((card) => {
            let str = card.find(this.#selectors.priceSelector).text().slice(1)
            if (Number(str) < cheapestPrice) {
                cheapestPrice = Number(str);
            }
        }).then(() => {
            cy
              .contains(this.#selectors.cardClass, cheapestPrice.toString())
              .find('a')
              .should('be.visible')
              .click();
          }
        );
    }

    async #enterMostExpensive() {
        var expPrice = -1;
        cy.get(this.#selectors.cardClass).each((card) => {
            let str = card.find(this.#selectors.priceSelector).text().slice(1)
            if (Number(str) > expPrice) {
                expPrice = Number(str)
            }
        }).then(() => {
            cy
              .contains(this.#selectors.cardClass, expPrice.toString())
              .find('a')
              .should('be.visible')
              .click();
          }
        )
    }

    #enterFirstMonitor() {
        this.#elements.itemCard().first().find('a').click();
    }
    
    #addToCart(device) {
        this.#elements.addToCartBtn().should('be.visible').click();
        this.#elements.homeBtn().click();
        cy.log(device + " added successfully");
    }

    async addCheapestPhone() {
        this.#elements.phonesBtn().click();
        cy.wait(300); // wait for the phones to load
        await this.#enterCheapest();
        this.#addToCart("phone");
    }

    async addExpensiveLaptop() {
        this.#elements.laptopBtn().click();
        cy.wait(300); // wait for the laptops to load
        await this.#enterMostExpensive();
        this.#addToCart("laptop");
    }

    addMonitor() {
        this.#elements.monitorBtn().click();
        this.#enterFirstMonitor();
        this.#addToCart("monitor");
    }
}
module.exports = new selectItems();