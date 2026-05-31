import { test } from "@playwright/test";
import { basicAuthData, getBasicAuthTests } from "@test-data/basic-auth-page";
import { PlaywrightTestAction } from "playwright/utils/playwright-adapter";

const actions = new PlaywrightTestAction();
const tests = getBasicAuthTests(actions);

test.describe("basic auth: credentialed access", () => {
  basicAuthData.forEach((row, idx) => {
    const testCase = tests[idx];

    if (testCase.skip) {
      test.skip(testCase.description, () => {});
      return;
    }

    // Per-row browser context with the row's credentials applied at context level.
    // Wrapped in a nested describe so test.use is scoped to this single case.
    test.describe(testCase.description, () => {
      test.use({ httpCredentials: { username: row.username, password: row.password } });

      test(testCase.description, async ({ page }) => {
        await page.goto("/basic_auth");
        for (const step of testCase.steps) {
          await test.step(step.description, async () => {
            await step.execute(page);
          });
        }
      });
    });
  });
});
