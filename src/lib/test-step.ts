import {  ActionReturnType, FrameworkAdapter } from "@lib/framework-adapter";
import { Page } from "@playwright/test";

export interface TestStepOptions {
  description: string;
  frameworkAdapter: FrameworkAdapter;
}

export interface ExecuteOptions {
  // Define any options needed for execution
  page?: Page
}
export abstract class TestStep {
  description: string;
  protected frameworkAdapter: FrameworkAdapter;
  
  constructor({ description, frameworkAdapter }: TestStepOptions) {
    this.description = description;
    this.frameworkAdapter = frameworkAdapter;
  }

  abstract execute(options?: ExecuteOptions): ActionReturnType;
}
