export abstract class TestExecutor {
  abstract executeTestCases(testCases: { description: string; action: () => void }[]): void;
}