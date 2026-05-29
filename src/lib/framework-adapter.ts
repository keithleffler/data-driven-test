export type CypressReturnType = Cypress.Chainable<any>;
export type PlaywrightReturnType = Promise<void>;

export type ActionReturnType = CypressReturnType | PlaywrightReturnType;
export type TestActionFn = (options?: any) => ActionReturnType;

export abstract class FrameworkAdapter {
  abstract navigateToPage: TestActionFn;
  abstract verifyLinkNavigationWithUrl: TestActionFn;
  abstract verifyLinkText: TestActionFn;
  abstract verifyPageTitle: TestActionFn;
  abstract verifyText: TestActionFn;
  abstract executeActions: TestActionFn;
}
