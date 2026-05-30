import { Page } from "@playwright/test";
import { TestActionFn } from "@lib/framework-adapter";


export type TestAction = {
  actionFn: TestActionFn;
  actionOptions?: ActionOptions;
}
export interface TestStepOptions {
  description: string;
  actions: TestAction[];
}

export interface ActionOptions {
  linkText?: string;
  expectedUrl?: string;
  page?: Page
  url?: string;
}

export interface Action {
  actionFn: TestActionFn;
  actionOptions?: ActionOptions;
}
export class TestStep {
  description: string;
  protected actions: Action[];

  constructor({ description, actions }: TestStepOptions) {
    this.description = description;
    this.actions = actions;
  }

  // Seed with undefined and chain on actionFn's return: a Promise.resolve() seed would
  // mix native Promises into Cypress's command queue and reorder actions in the runner.
  execute = (page?: Page) => {
    return this.actions.reduce<any>((prev, action) => {
      const options = page ? {page, ...action.actionOptions} : action.actionOptions;
      return prev ? prev.then(() => action.actionFn(options)) : action.actionFn(options);
    }, undefined);
  }
}
