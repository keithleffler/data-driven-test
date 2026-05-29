import { ExecuteOptions } from "../test-step";

export type CypressReturnType = Cypress.Chainable<any>;
export type PlaywrightReturnType = Promise<void>;
export type ActionReturnType = CypressReturnType | PlaywrightReturnType;
export type TestActionFn = (options?: ExecuteOptions) => ActionReturnType;

export abstract class TestAction {
  abstract verifyLinkNavigation: TestActionFn;
  abstract verifyText: TestActionFn;
}
