
export type CypressReturnType = Cypress.Chainable<any>;
export type PlaywrightReturnType = Promise<void>;

export type ActionReturnType = CypressReturnType | PlaywrightReturnType;
export type TestActionFn = (options?: any) => ActionReturnType;

export abstract class FrameworkAdapter {
  
  abstract navigateToPage: TestActionFn;
  abstract verifyLinkExists: TestActionFn;
  abstract verifyLinkHref: TestActionFn;
  abstract clickLink: TestActionFn;
  abstract verifyUrl: TestActionFn;
  abstract verifyAuthenticated: TestActionFn;
  abstract verifyAuthFailed: TestActionFn;
  abstract executeActions: TestActionFn;
}
