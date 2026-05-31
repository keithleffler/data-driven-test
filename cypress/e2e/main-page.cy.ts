import { getMainPageTests } from "@test-data/main-page";
import { CypressTestAction } from "cypress/support/cypress-adapter";
const actions = new CypressTestAction();

describe("main page tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  for (const testCase of getMainPageTests(actions)) {
    if (testCase.skip) {
      it.skip(testCase.description, () => {});
      continue;
    }
    it(testCase.description, () => {
      for (const step of testCase.steps) {
        cy.step(step.description);
        step.execute();
      }
    });
  }
});
