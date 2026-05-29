import { PlaywrightReturnType, FrameworkAdapter } from "@lib/framework-adapter";
import { TestAction } from "@lib/index";

export class PlaywrightTestAction extends FrameworkAdapter {
    executeActions = (actions: TestAction[], options?: any): PlaywrightReturnType  => {
        return actions.reduce<PlaywrightReturnType>((prev, action) => {
            return prev.then(() => { action.actionFn(action.actionOptions ?? options); });
        }, Promise.resolve());
    }
    verifyLinkNavigation = (): PlaywrightReturnType => {
        return Promise.resolve();
    }
    verifyText = (): PlaywrightReturnType => {
        return Promise.resolve();
    }
    navigateToPage = (url: string): PlaywrightReturnType => {
        return Promise.resolve();
    }
    verifyLinkText = (): PlaywrightReturnType => {
        return Promise.resolve();
    }
    verifyPageTitle = (): PlaywrightReturnType => {
        return Promise.resolve();
    } 
    verifyLinkNavigationWithUrl = (options?: any): PlaywrightReturnType => {
        return Promise.resolve();
    }
}
