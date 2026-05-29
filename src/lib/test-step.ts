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

  execute = () => {
  }

}
