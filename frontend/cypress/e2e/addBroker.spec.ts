/// <reference types="cypress" />
import { beforeEach, describe, it } from "vitest";
describe("Broker Management", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should display search form", () => {
    cy.get("input[aria-label='Name']").should("exist");
    cy.get("input[aria-label='Name']").type("Test Broker");
    cy.get('li[role="option"]').should("contain", "Add manually");
  });

  it("should open modal for adding new broker", () => {
    cy.get("input[aria-label='Name']").type("Test Broker");
    cy.get('li[role="option"]').contains("Add manually").click();
    cy.get("div[role='dialog']").should("be.visible");
    cy.get("input[name='name']").type("New Broker");
    cy.get("input[name='address']").type("123 Main St");
    cy.get("input[name='city']").type("New York");
    cy.get("input[name='country']").type("USA");
    cy.get("button").contains("Save").should("not.be.disabled").click();
  });

  it("should save the new broker", () => {
    cy.get("input[aria-label='Name']").type("Test Broker");
    cy.get('li[role="option"]').contains("Add manually").click();
    cy.get("input[name='name']").type("New Broker");
    cy.get("input[name='address']").type("123 Main St");
    cy.get("input[name='city']").type("New York");
    cy.get("input[name='country']").type("USA");
    cy.get("button").contains("Save").click();

    cy.get("div[role='dialog']").should("not.exist");
    cy.get("li").contains("New Broker").should("exist");
  });

  it("should display error for incomplete form submission", () => {
    cy.get("input[aria-label='Name']").type("Test Broker");
    cy.get('li[role="option"]').contains("Add manually").click();
    cy.get("button").contains("Save").should("be.disabled");
  });
});
