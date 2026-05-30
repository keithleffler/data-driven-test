import { test, expect } from "@playwright/test";
import { getMainPageTests } from "@test-data/main-page/main-page";
import { PlaywrightTestAction } from "playwright/utils/playwright-adapter";

const actions = new PlaywrightTestAction();
const mainPageTests = getMainPageTests(actions);

test.describe("main page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
  });

  for (const testCase of mainPageTests) {
    test(testCase.description, async ({ page }) => {
      for (const step of testCase.steps) {
        await test.step(step.description, async () => {
          await expect(page).toHaveTitle(/The Internet/);
          await step.execute(page);
        });
      }
    });
  }
});
