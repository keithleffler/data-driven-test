import { PlaywrightReturnType, FrameworkAdapter } from "@lib/framework-adapter";

export class PlaywrightTestAction extends FrameworkAdapter {
    verifyLinkNavigation = (): PlaywrightReturnType => {
        return Promise.resolve();
    }
    verifyText = (): PlaywrightReturnType => {
        return Promise.resolve();
    }
    navigateToPage(url: string): PlaywrightReturnType {
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
