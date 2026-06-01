
export type CypressReturnType = Cypress.Chainable<any>;
export type PlaywrightReturnType = Promise<void>;

export type ActionReturnType = CypressReturnType | PlaywrightReturnType;
export type TestActionFn = (options?: any) => ActionReturnType;

export abstract class FrameworkAdapter {
  
  abstract clickLink: TestActionFn;
  abstract executeActions: TestActionFn;
  abstract navigateToPage: TestActionFn;
  
  abstract verifyAuthenticated: TestActionFn;
  abstract verifyAuthFailed: TestActionFn;
  abstract verifyLinkExists: TestActionFn;
  abstract verifyLinkHref: TestActionFn;
  abstract verifyUrl: TestActionFn;
}
