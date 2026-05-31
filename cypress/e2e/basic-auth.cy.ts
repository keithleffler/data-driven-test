import { basicAuthData, getBasicAuthTests } from "@test-data/basic-auth-page";
import { CypressTestAction } from "cypress/support/cypress-adapter";

const actions = new CypressTestAction();
const tests = getBasicAuthTests(actions);

describe("basic auth: credentialed access", () => {
  basicAuthData.forEach((row, idx) => {
    const testCase = tests[idx];

    if (testCase.skip) {
      it.skip(testCase.description, () => {});
      return;
    }

    it(testCase.description, () => {
      // failOnStatusCode: false because the failure cases expect a 401 response.
      cy.visit("/basic_auth", {
        auth: { username: row.username, password: row.password },
        failOnStatusCode: false,
      });
      for (const step of testCase.steps) {
        cy.step(step.description);
        step.execute();
      }
    });
  });
});
