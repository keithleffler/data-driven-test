import { FrameworkAdapter } from "@lib/framework-adapter";
import { TestAction } from "@lib/index";

export class MainPagePO {
    constructor(protected adapter: FrameworkAdapter) {}

    navigateToPage = ({ url }: { url: string }): TestAction => ({
        actionFn: this.adapter.navigateToPage,
        actionOptions: { url },
    });

    verifyLinkExists = ({ linkText }: { linkText: string }): TestAction => ({
        actionFn: this.adapter.verifyLinkExists,
        actionOptions: { linkText },
    });

    verifyLinkHref = ({ linkText, expectedUrl }: { linkText: string; expectedUrl: string }): TestAction => ({
        actionFn: this.adapter.verifyLinkHref,
        actionOptions: { linkText, expectedUrl },
    });

    clickLink = ({ linkText }: { linkText: string }): TestAction => ({
        actionFn: this.adapter.clickLink,
        actionOptions: { linkText },
    });

    verifyUrl = ({ expectedUrl }: { expectedUrl: string }): TestAction => ({
        actionFn: this.adapter.verifyUrl,
        actionOptions: { expectedUrl },
    });
}
