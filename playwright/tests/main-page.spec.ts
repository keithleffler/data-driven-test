import { test, expect } from "@playwright/test";
import { getMainPageTests } from "@test-data/main-page/main-page";
import { PlaywrightTestAction } from "playwright/utils/playwright-adapter";

const actions = new PlaywrightTestAction();
const mainPageTests = getMainPageTests(actions);

// main page tests ------------------------------
test.describe("main page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
  });

  // iterate through test cases
  for (const testCase of mainPageTests) {
    // test -----------------------------------
    test(testCase.description, async ({ page }) => {
      // iterate through test steps
      for (const step of testCase.steps) {
        // step --------------------------------
        await test.step(step.description, async () => {
          await expect(page).toHaveTitle(/The Internet/);
          await step.execute() ;
        });
        // end step -----------------------------
      }
    });
    // end test -----------------------------
  }
});
