import { ActionReturnType, TestAction } from "@lib/test-actions/test-action";
import { TestStep } from "../test-step";

export class VerifyTextAction extends TestStep {
  constructor({ description, actions }: { description: string; actions: TestAction }) {
    super({ description, actions });
  }

  execute(): ActionReturnType {
    return this.actions.verifyText();
  }
}