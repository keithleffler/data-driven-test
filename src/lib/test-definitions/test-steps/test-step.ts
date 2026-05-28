
export class TestStepDefinition {
  constructor(public readonly description: string, public readonly action: () => void) {}
}

export class TestStep {
  constructor(public readonly description: string, public readonly action: () => void) {}
}

