import { FrameworkAdapter } from "@lib/framework-adapter";
import {TestAction} from "@lib/index";
export class MainPagePO   {
    adapter: FrameworkAdapter;
    constructor(adapter: FrameworkAdapter) {
        this.adapter = adapter;
    }
    navigateToPage = (url: string) => {
        return this.adapter.navigateToPage(url);
    }
    verifyLinkNavigationWithUrl = (options?: any) => {
        return this.adapter.verifyLinkNavigationWithUrl(options);
    }

    verifyLinkText = (options?: any) => {
        return this.adapter.verifyLinkText(options);
    }
    verifyPageTitle = (options?: any) => {
        return this.adapter.verifyPageTitle(options);
    }
    verifyText = (options?: any) => {
        return this.adapter.verifyText(options);
    }
}