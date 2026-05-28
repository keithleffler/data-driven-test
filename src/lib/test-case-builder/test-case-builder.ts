import { TestCase, TestCaseDefinition } from "@lib/test-definitions/test-case";

export abstract class TestCaseBuilder {
  private description: string = '';
  private steps: { description: string; action: () => void }[] = [];

  setDescription(description: string): TestCaseBuilder {
    this.description = description;
    return this;
  }


  abstract build(testDefinitions: TestCaseDefinition[]): TestCase[];    

}