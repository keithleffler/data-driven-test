import { test, expect } from "@playwright/test";
import { getMainPageTests } from "@test-data/main-page";
import { PlaywrightTestAction } from "playwright/utils/playwright-adapter";

const actions = new PlaywrightTestAction();
const mainPageTests = getMainPageTests(actions);

test.describe("main page: link navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  for (const testCase of mainPageTests) {
    if (testCase.skip) {
      test.skip(testCase.description,() => {});
      continue;
    } 
    test(testCase.description, async ({ page }) => {
      for (const step of testCase.steps) {
        await test.step(step.description, async () => {
          await step.execute(page);
        });
      }
    });
  }
});
