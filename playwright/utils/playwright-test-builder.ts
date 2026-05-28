import { TestCase, TestCaseDefinition } from "@lib/index";
import { TestCaseBuilder } from "@lib/test-case-builder/test-case-builder";

export class PlaywrightTestBuilder extends TestCaseBuilder {
  private testCases: TestCase[] = [];

  addTestCase(description: string, action: () => void): PlaywrightTestBuilder {
    this.testCases.push(new TestCase(description, action));
    return this;
  }

  build(testDefinitions: TestCaseDefinition[]): TestCase[] {
    return this.testCases;
  }}
  