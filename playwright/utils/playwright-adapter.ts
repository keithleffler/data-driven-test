import { PlaywrightReturnType, FrameworkAdapter } from "@lib/framework-adapter";
import { TestAction } from "@lib/index";
import { Page } from "@playwright/test";
export class PlaywrightTestAction extends FrameworkAdapter {

    executeActions = (actions: TestAction[], options?: any): PlaywrightReturnType  => {
        return actions.reduce<PlaywrightReturnType>((prev, action) => {
            return prev.then(() => action.actionFn(action.actionOptions ?? options));
        }, Promise.resolve());
    }
    // verifyLinkNavigation = (): PlaywrightReturnType => {
    //     return Promise.resolve();
    // }
    // verifyText = (): PlaywrightReturnType => {
    //     return Promise.resolve();
    // }`
    navigateToPage = ({url, page}: {url: string; page: Page}): PlaywrightReturnType => {
        return page.goto(url).then(() => {
            // Additional logic can be added here if needed
        });
    }
    verifyLinkText = (): PlaywrightReturnType => {
        return Promise.resolve();
    }
    // verifyPageTitle = (): PlaywrightReturnType => {
    //     return Promise.resolve();
    // } 
    // verifyLinkNavigationWithUrl = (options?: any): PlaywrightReturnType => {
    //     return Promise.resolve();
    // }
}
