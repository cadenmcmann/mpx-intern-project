describe("App", () => {
  it("should login with valid credentials and be navigated to shopping", () => {
    cy.visit("http://localhost:4200/shopping");
    cy.get("[name=email]").type("user@user.com");
    cy.get("[name=password]").type("iamauser");
    cy.get("[type=submit]").click();
    cy.url().should("include", "/shopping");
  });

  it("should navigate to each shopping items page and checkout with navigation aids", () => {
    // pre-test login
    cy.visit("http://localhost:4200/auth");
    cy.get("[name=email]").type("user@user.com");
    cy.get("[name=password]").type("iamauser");
    cy.get("[type=submit]").click();

    cy.contains("Food").click();
    cy.url().should("include", "/shopping/food");
    cy.visit("http://localhost:4200/shopping");

    cy.contains("Electronics").click();
    cy.url().should("include", "/shopping/electronics");
    cy.visit("http://localhost:4200/shopping");

    cy.contains("Beverages").click();
    cy.url().should("include", "/shopping/beverages");
    cy.visit("http://localhost:4200/shopping");

    cy.contains("Alcohol").click();
    cy.url().should("include", "/shopping/alcohol");
    cy.visit("http://localhost:4200/shopping");

    cy.contains("Checkout").click();
    cy.url().should("include", "/checkout");
  });

  it("should add items to cart from shopping list pages", () => {
    cy.visit("http://localhost:4200/auth");
    cy.get("[name=email]").type("user@user.com");
    cy.get("[name=password]").type("iamauser");
    cy.get("[type=submit]").click();

    // add food item
    cy.contains("Food").click();
    cy.contains("Add to Cart").click();
    cy.visit("http://localhost:4200/shopping");

    // add electronic item
    cy.contains("Electronics").click();
    cy.contains("Add to Cart").click();
    cy.visit("http://localhost:4200/shopping");

    // add beverage
    cy.contains("Beverages").click();
    cy.contains("Add to Cart").click();
    cy.visit("http://localhost:4200/shopping");

    // add alcohol
    cy.contains("Alcohol").click();
    cy.contains("Add to Cart").click();
    cy.visit("http://localhost:4200/shopping");

    // visit cart
    cy.visit("http://localhost:4200/checkout");
  });
});
