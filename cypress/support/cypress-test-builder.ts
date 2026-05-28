import { TestCase, TestCaseDefinition } from "@lib/test-definitions/test-case";
import {TestCaseBuilder} from "@lib/test-case-builder/test-case-builder";

export class CypressTestBuilder extends TestCaseBuilder {
  private testCases: TestCase[] = [];

  addTestCase(description: string, action: () => void): CypressTestBuilder {
    this.testCases.push(new TestCase(description, action));
    return this;
  }

  build(testDefinitions: TestCaseDefinition[]): TestCase[] {
    return this.testCases;
  }
}