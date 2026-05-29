import { PlaywrightReturnType, FrameworkAdapter, TestActionFn } from "@lib/framework-adapter";

export class PlaywrightTestAction extends FrameworkAdapter {
    executeActions = (actions: TestActionFn[], options?: any): PlaywrightReturnType  => {
        return actions.reduce((prev, action) => {
            return prev.then(() => action(options));
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
    verifyLinkNavigationWithUrl = (linkText: string, expectedUrl: string): PlaywrightReturnType => {
        return Promise.resolve();
    }
}
