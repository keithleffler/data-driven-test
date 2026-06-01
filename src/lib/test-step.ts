import { Page } from "@playwright/test";
import { TestAction, TestStepOptions } from "@lib/interfaces";




export class TestStep {
  description: string;
  protected actions: TestAction[];

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
