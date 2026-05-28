export class CypressTestExecutor {
  executeTestCases(testCases: { description: string; action: () => void }[]): void {
    testCases.forEach((testCase) => {
      it(testCase.description, testCase.action);
    });
  }
}   
