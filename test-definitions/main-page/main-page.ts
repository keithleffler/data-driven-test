import { TestAction } from "@lib/test-actions/test-action";
import { TestCase } from "@lib/test-case";
import { LinkNavigationStep } from "@lib/test-actions/verify-link-navigation-action";

const getTests: (actions: TestAction) => TestCase[] = (actions) => [
  // A/B Testing
  new TestCase("A/B Testing Link Navigation Test", [
    new LinkNavigationStep({
      actions,
      description: "Navigate to the A/B Testing page and verify URL",
      sourcePage: "/",
      text: "A/B Testing",
      expectedUrl: "/abtest",
    }),
  ]),
  // Add/Remove Elements
  new TestCase("Add/Remove Elements Link Navigation Test", [
    new LinkNavigationStep({
      actions,
      description: "Navigate to the Add/Remove Elements page and verify URL",
      sourcePage: "/",
      text: "Add/Remove Elements",
      expectedUrl: "/add_remove_elements",
    }),
  ]),

  // Broken Images
  new TestCase("Broken Images Link Navigation Test", [
    new LinkNavigationStep({
      actions,
      description: "Navigate to the Broken Images page and verify URL",
      sourcePage: "/",
      text: "Broken Images",
      expectedUrl: "/broken_images",
    }),
  ]),
  // Challenging DOM
  new TestCase("Challenging DOM Link Navigation Test", [
    new LinkNavigationStep({
      actions,
      description: "Navigate to the Challenging DOM page and verify URL",
      sourcePage: "/",
      text: "Challenging DOM",
      expectedUrl: "/challenging_dom",
    }),
  ]),
  // Checkboxes
  new TestCase("Checkboxes Link Navigation Test", [
    new LinkNavigationStep({
      actions,
      description: "Navigate to the Checkboxes page and verify URL",
      sourcePage: "/",
      text: "Checkboxes",
      expectedUrl: "/checkboxes",
    }),
  ]),
];

export const getMainPageTests = (actions: TestAction): TestCase[] => {
  return getTests(actions);
};
