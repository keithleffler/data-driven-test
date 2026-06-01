import { TestActionFn } from "./interfaces";

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
