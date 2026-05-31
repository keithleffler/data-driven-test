import { FrameworkAdapter } from "@lib/framework-adapter";
import { TestAction, TestStep } from "@lib/index";

export class BasicAuthPagePO {
    constructor(protected adapter: FrameworkAdapter) {}

    // Public step-level API.
    // Credentials are configured at the spec level (Playwright httpCredentials, Cypress
    // cy.visit auth option) before these steps run — the page object asserts outcomes only.

    verifyAuthenticatedStep = (): TestStep =>
        new TestStep({
            description: "Verify authenticated access",
            actions: [this.verifyAuthenticated()],
        });

    verifyAuthFailedStep = (): TestStep =>
        new TestStep({
            description: "Verify auth challenge / unauthorized response",
            actions: [this.verifyAuthFailed()],
        });

    // Protected action-level API.

    protected verifyAuthenticated = (): TestAction => ({
        actionFn: this.adapter.verifyAuthenticated,
    });

    protected verifyAuthFailed = (): TestAction => ({
        actionFn: this.adapter.verifyAuthFailed,
    });
}
