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
  // Define any options needed for execution
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

  execute = (page?: Page) => {
    return this.actions.reduce<any>((prev, action) => {
      const options = page ? {page, ...action.actionOptions} : action.actionOptions;
      return prev ? prev.then(() => action.actionFn(options)) : action.actionFn(options);
    }, undefined);
  }
}
