import {  ActionReturnType, TestAction } from "@lib/test-actions/test-action";
import { Page } from "@playwright/test";

export interface TestStepOptions {
  description: string;
  actions: TestAction;
}

export interface ExecuteOptions {
  // Define any options needed for execution
  page?: Page
}
export abstract class TestStep {
  description: string;
  protected actions: TestAction;
  
  constructor({ description, actions }: TestStepOptions) {
    this.description = description;
    this.actions = actions;
  }

  abstract execute(options?: ExecuteOptions): ActionReturnType;
}
