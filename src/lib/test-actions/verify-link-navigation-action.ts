import { ActionReturnType, TestAction } from "@lib/test-actions/test-action";
import { TestStep, TestStepOptions } from "../test-step";
import { ExecuteOptions } from "../test-step";

interface LinkNavigationStepOptions extends TestStepOptions {
    sourcePage: string;
    expectedUrl: string;
    text: string;
}
export class LinkNavigationStep extends TestStep {
    
    protected sourcePage: string;
    protected expectedUrl: string;
    protected text: string;

    constructor({ description, sourcePage, expectedUrl, text, actions }: LinkNavigationStepOptions) {
        super({ description , actions});
        this.sourcePage = sourcePage;
        this.expectedUrl = expectedUrl;
        this.text = text;
    }
    execute(options?: ExecuteOptions): ActionReturnType {
        // Implementation for verifying link navigation
        return this.actions.verifyLinkNavigation();
    }
}