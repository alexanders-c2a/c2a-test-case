class userLogin {
    #strings = {
        username: "automatedUser26@example.com",
        password: "4r4nd0mp4ssw0rd",
        logonStr: "Welcome "
    };
    #ids = {
        loginWindowBtn: "#login2",
        logoutBtn: "#logout2",
        usernameField: '#loginusername',
        passwordField: '#loginpassword',
        navBar: "#navbarExample"
    };
    #selectors = {
        loginBtn: 'button[onclick="logIn()"]'
    };
    #elements = {
        loginWindowBtn: () => { return cy.get(this.#ids.loginWindowBtn) },
        usernameField: () => { return cy.get(this.#ids.usernameField) },
        passwordField: () => { return cy.get(this.#ids.passwordField) },
        loginBtn: () => { return cy.get(this.#selectors.loginBtn) },
        navBar: () => { return cy.get(this.#ids.navBar) }
    };

    #updateLogonStr() {
        this.#strings.logonStr += this.#strings.username
    }

    #openLoginWindow() {
        this.#elements.loginWindowBtn().click();
        cy.wait(1000) // wait for the login window to open
    }

    #clickLoginBtn() {
        this.#elements.loginBtn().click();
    }

    #typeLoginForm() {
        this.#elements.usernameField().type(this.#strings.username, { delay: 0 });
        this.#elements.passwordField().type(this.#strings.password, { delay: 0 });
    }

    #checkLogon() {
        this.#updateLogonStr();
        this.#elements.navBar().contains(this.#strings.logonStr);
    }

    login() {
        this.#openLoginWindow();
        this.#typeLoginForm();
        this.#clickLoginBtn();
        this.#checkLogon();
    }

}

module.exports = new userLogin();
