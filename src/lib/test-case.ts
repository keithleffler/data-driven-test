import { TestStep } from "./test-step";
export class TestCase {
  constructor(
    public readonly description: string,
    public steps: TestStep[],
  ) {}
}
