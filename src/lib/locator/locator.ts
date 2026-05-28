
export type ElementLocatorType = () => Cypress.Chainable<JQuery<HTMLElement>>;

export class ElementLocator<T extends ElementLocatorType> {
  constructor(public readonly selector: string) {}
  getElement(): T {
    return (() => cy.get(this.selector)) as T;
  }
}
