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
      // Success cases load the page with credentials so the rendered "Congratulations!"
      // assertion has a real page to check. Failure cases don't navigate — the adapter
      // exercises auth out-of-band via cy.request (see CypressTestAction.verifyAuthFailed
      // for why a real navigation can't be used).
      if (row.expectSuccess) {
        cy.visit("/basic_auth", { auth: { username: row.username, password: row.password } });
      }
      for (const step of testCase.steps) {
        cy.step(step.description);
        step.execute();
      }
    });
  });
});
