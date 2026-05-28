import { TestExecutor } from "@lib/test-executor";

export class PlaywrightTestExecutor extends TestExecutor {
  executeTestCases(testCases: { description: string; action: () => void }[]): void {
    testCases.forEach((testCase) => {
      test(testCase.description, testCase.action);
    });
  }
}