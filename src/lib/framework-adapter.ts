import { ExecuteOptions } from "./test-step";

export type CypressReturnType = Cypress.Chainable<any>;
export type PlaywrightReturnType = Promise<void>;
export type ActionReturnType = CypressReturnType | PlaywrightReturnType;
export type TestActionFn = (options?: ExecuteOptions) => ActionReturnType;

export abstract class FrameworkAdapter {
  abstract navigateToPage(url: string): ActionReturnType;
  abstract verifyLinkText: TestActionFn;
  abstract verifyLinkNavigationWithUrl: (linkText: string, expectedUrl: string) => ActionReturnType;
  abstract verifyPageTitle: TestActionFn;
  abstract verifyText: TestActionFn;
}
