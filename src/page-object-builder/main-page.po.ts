import { FrameworkAdapter } from "@lib/framework-adapter";
import { TestAction, TestStep } from "@lib/index";

export class MainPagePO {
    constructor(protected adapter: FrameworkAdapter) {}

    // Public step-level API — these methods describe *what* the test verifies.
    // The PO owns step composition and description wording.

    navigateToPageStep = ({ url }: { url: string }): TestStep =>
        new TestStep({
            description: "Navigate to home page",
            actions: [this.navigateToPage({ url })],
        });

    verifyLinkStep = ({ linkText, expectedUrl }: { linkText: string; expectedUrl: string }): TestStep =>
        new TestStep({
            description: `Verify ${linkText} link`,
            actions: [
                this.verifyLinkExists({ linkText }),
                this.verifyLinkHref({ linkText, expectedUrl }),
            ],
        });

    verifyLinkNavigationStep = ({ linkText, expectedUrl }: { linkText: string; expectedUrl: string }): TestStep =>
        new TestStep({
            description: `Click ${linkText} link and verify navigation`,
            actions: [
                this.clickLink({ linkText }),
                this.verifyUrl({ expectedUrl }),
            ],
        });

    // Protected action-level API — building blocks for the step methods above.
    // Not exposed to test definitions: tests should compose steps, not actions.

    protected navigateToPage = ({ url }: { url: string }): TestAction => ({
        actionFn: this.adapter.navigateToPage,
        actionOptions: { url },
    });

    protected verifyLinkExists = ({ linkText }: { linkText: string }): TestAction => ({
        actionFn: this.adapter.verifyLinkExists,
        actionOptions: { linkText },
    });

    protected verifyLinkHref = ({ linkText, expectedUrl }: { linkText: string; expectedUrl: string }): TestAction => ({
        actionFn: this.adapter.verifyLinkHref,
        actionOptions: { linkText, expectedUrl },
    });

    protected clickLink = ({ linkText }: { linkText: string }): TestAction => ({
        actionFn: this.adapter.clickLink,
        actionOptions: { linkText },
    });

    protected verifyUrl = ({ expectedUrl }: { expectedUrl: string }): TestAction => ({
        actionFn: this.adapter.verifyUrl,
        actionOptions: { expectedUrl },
    });
}
