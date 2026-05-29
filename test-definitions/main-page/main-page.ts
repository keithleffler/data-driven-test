import { FrameworkAdapter } from "@lib/framework-adapter";
import { TestStep } from "@lib/index";
import { TestCase } from "@lib/test-case";
import { MainPagePO } from "@page-objects/main-page.po";

const getTests = (po: MainPagePO): TestCase[] => [
  // A/B Testing
  new TestCase("A/B Testing Link Navigation Test", [
    new TestStep({
      description: "Navigate to the A/B Testing page and verify URL",
      actions: [
        {
          actionFn: po.verifyLinkNavigationWithUrl,
          actionOptions: {
            linkText: "A/B Testing",
            expectedUrl: "/abtest"
          }
        }
      ],

    }),
  ]),
  // Add/Remove Elements
  new TestCase("Add/Remove Elements Link Navigation Test", [
    new TestStep({
      description: "Navigate to the Add/Remove Elements page and verify URL",
      actions: [
        {
          actionFn: po.verifyLinkNavigationWithUrl,
          actionOptions: {
            linkText: "Add/Remove Elements",
            expectedUrl: "/add_remove_elements"
          }
        }
      ],
    }),
  ]),

  // Broken Images
  new TestCase("Broken Images Link Navigation Test", [
    new TestStep({
      description: "Navigate to the Broken Images page and verify URL",
      actions: [
        {
          actionFn: po.verifyLinkNavigationWithUrl,
          actionOptions: {
            linkText: "Broken Images",
            expectedUrl: "/broken_images"
          }
        }
      ],
    }),
  ]),
  // Challenging DOM
  new TestCase("Challenging DOM Link Navigation Test", [
    new TestStep({
      description: "Navigate to the Challenging DOM page and verify URL",
      actions: [
        {
          actionFn: po.verifyLinkNavigationWithUrl,
          actionOptions: {
            linkText: "Challenging DOM",
            expectedUrl: "/challenging_dom"
          }
        }
      ],
    }),
  ]),
  // Checkboxes
  new TestCase("Checkboxes Link Navigation Test", [
    new TestStep({
      description: "Navigate to the Checkboxes page and verify URL",
      actions: [
        {
          actionFn: po.verifyLinkNavigationWithUrl,
          actionOptions: {
            linkText: "Checkboxes",
            expectedUrl: "/checkboxes"
          }
        }
      ],
    }),
  ]),
];

export const getMainPageTests = (frameworkAdapter: FrameworkAdapter): TestCase[] => {
  const po = new MainPagePO(frameworkAdapter);
  return getTests(po);
};
