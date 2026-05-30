import { getMainPageTests } from "@test-data/main-page/main-page";
import { CypressTestAction } from "cypress/support/cypress-adapter";
const actions = new CypressTestAction();

describe("main page tests", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/");
  });

  for (const testCase of getMainPageTests(actions)) {
    it(testCase.description, () => {
      for (const step of testCase.steps) {
        cy.step(step.description);
        step.execute();
      }
    });
  }
});
