import { FrameworkAdapter } from "@lib/framework-adapter";
import { TestStep } from "@lib/test-step";
import { TestAction } from "@lib/interfaces";

export class BasicAuthPagePO {
    constructor(protected adapter: FrameworkAdapter) {}

    // Public step-level API.
    // For success cases, credentials are configured at the spec level (Playwright
    // httpCredentials, Cypress cy.visit auth option) before the page loads — the
    // assertion is on the rendered page.
    // For failure cases, the adapter may exercise auth out-of-band rather than via a
    // browser navigation (Cypress does this because the browser's auth dialog hangs the
    // page load on 401). The url/username/password are passed in so the adapter can
    // make that out-of-band request itself.

    verifyAuthenticatedStep = (): TestStep =>
        new TestStep({
            description: "Verify authenticated access",
            actions: [this.verifyAuthenticated()],
        });

    verifyAuthFailedStep = ({ url, username, password }: { url: string; username: string; password: string }): TestStep =>
        new TestStep({
            description: "Verify auth challenge / unauthorized response",
            actions: [this.verifyAuthFailed({ url, username, password })],
        });

    // Protected action-level API.

    protected verifyAuthenticated = (): TestAction => ({
        actionFn: this.adapter.verifyAuthenticated,
    });

    protected verifyAuthFailed = ({ url, username, password }: { url: string; username: string; password: string }): TestAction => ({
        actionFn: this.adapter.verifyAuthFailed,
        actionOptions: { url, username, password },
    });
}
