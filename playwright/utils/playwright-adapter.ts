import { PlaywrightReturnType, FrameworkAdapter } from "@lib/framework-adapter";
import { TestAction } from "@lib/index";
import { expect, Locator, Page } from "@playwright/test";

export class PlaywrightTestAction extends FrameworkAdapter {

    executeActions = (actions: TestAction[], options?: any): PlaywrightReturnType => {
        return actions.reduce<PlaywrightReturnType>((prev, action) => {
            return prev.then(() => action.actionFn(action.actionOptions ?? options));
        }, Promise.resolve());
    }

    // Internal helper, not part of the FrameworkAdapter contract — Locator vs Cypress.Chainable
    // return types would leak framework specifics into the abstract base.
    getLinkByText = ({ linkText, page }: { linkText: string; page: Page }): Locator => {
        return page.getByRole("link", { name: linkText, exact: true });
    }

    navigateToPage = ({ url, page }: { url: string; page: Page }): PlaywrightReturnType => {
        return page.goto(url).then(() => {});
    }

    verifyLinkExists = async ({ linkText, page }: { linkText: string; page: Page }): PlaywrightReturnType => {
        await expect(this.getLinkByText({ linkText, page })).toHaveCount(1);
    }

    verifyLinkHref = async ({ linkText, expectedUrl, page }: { linkText: string; expectedUrl: string; page: Page }): PlaywrightReturnType => {
        await expect(this.getLinkByText({ linkText, page })).toHaveAttribute("href", expectedUrl);
    }

    clickLink = ({ linkText, page }: { linkText: string; page: Page }): PlaywrightReturnType => {
        return this.getLinkByText({ linkText, page }).click();
    }

    verifyUrl = async ({ expectedUrl, page }: { expectedUrl: string; page: Page }): PlaywrightReturnType => {
        await expect(page).toHaveURL((url) => url.pathname === expectedUrl);
    }

    verifyAuthenticated = async ({ page }: { page: Page }): PlaywrightReturnType => {
        await expect(page.getByText("Congratulations!")).toBeVisible();
    }

    verifyAuthFailed = async ({ page }: { page: Page }): PlaywrightReturnType => {
        await expect(page.locator("body")).toContainText("Not authorized");
    }
}
