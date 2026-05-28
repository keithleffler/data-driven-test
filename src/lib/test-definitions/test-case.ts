import { TestStepDefinition } from "./test-steps/test-step";

export class TestCaseDefinition {
  constructor(public readonly description: string, public readonly steps: TestStepDefinition[]) {}
}

export class TestCase {
  constructor(public readonly description: string, public readonly action: () => void) {}
}