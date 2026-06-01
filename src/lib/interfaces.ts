
export type CypressReturnType = Cypress.Chainable<any>;
export type PlaywrightReturnType = Promise<void>;
export type ActionReturnType = CypressReturnType | PlaywrightReturnType;
export type TestActionFn = (options?: any) => ActionReturnType;

export interface TestAction  {
  actionFn: TestActionFn;
  actionOptions?: ActionOptions;
}

import { Page } from "@playwright/test";

export interface TestStepOptions {
  description: string;
  actions: TestAction[];
}

export interface ActionOptions {
  linkText?: string;
  expectedUrl?: string;
  page?: Page
  url?: string;
  username?: string;
  password?: string;
}

export interface Action {
  actionFn: TestActionFn;
  actionOptions?: ActionOptions;
}