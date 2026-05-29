import { ActionReturnType, FrameworkAdapter } from "@lib/framework-adapter";
import { TestAction, TestStep } from "@lib/index";
import { TestCase } from "@lib/test-case";
import { MainPagePO } from "@page-objects/main-page.po";
import { Page } from "@playwright/test";

const buildAction = {
  navigateToPage: (po: MainPagePO, { url }: { url: string }): TestAction => ({
    actionFn: po.navigateToPage,
    actionOptions: { url }
  }),
  // verifyLinkNavigationWithUrl: (po: MainPagePO, { linkText, expectedUrl }: { linkText: string, expectedUrl: string }): TestAction => ({
  //   actionFn: po.verifyLinkNavigationWithUrl,
  //   actionOptions: { linkText, expectedUrl }
  // }),
}
const getTests = (po: MainPagePO): TestCase[] => [
  // A/B Testing
  new TestCase("A/B Testing Link Navigation Test", [
    new TestStep({
      description: "Navigate to the A/B Testing page and verify URL",
      actions: [
        buildAction.navigateToPage(po, { url: "/" }),
        // buildAction.verifyLinkNavigationWithUrl(po, { linkText: "A/B Testing", expectedUrl: "/abtest" })
      ],

    }),
  ]),

  // Add/Remove Elements
  new TestCase("Add/Remove Elements Link Navigation Test", [
    new TestStep({
      description: "Navigate to the Add/Remove Elements page and verify URL",
      actions: [
        buildAction.navigateToPage(po, { url: "/" }),
        // buildAction.verifyLinkNavigationWithUrl(po, { linkText: "Add/Remove Elements", expectedUrl: "/add_remove_elements" })

      ],
    }),
  ]),

  // Broken Images
  new TestCase("Broken Images Link Navigation Test", [
    new TestStep({
      description: "Navigate to the Broken Images page and verify URL",
      actions: [
        buildAction.navigateToPage(po, { url: "/" }),
        // buildAction.verifyLinkNavigationWithUrl(po, { linkText: "Broken Images", expectedUrl: "/broken_images" })
      ],
    }),
  ]),
  // Challenging DOM
  new TestCase("Challenging DOM Link Navigation Test", [
    new TestStep({
      description: "Navigate to the Challenging DOM page and verify URL",
      actions: [
        buildAction.navigateToPage(po, { url: "/" }),
        // buildAction.verifyLinkNavigationWithUrl(po, { linkText: "Challenging DOM", expectedUrl: "/challenging_dom" })
      ],
    }),
  ]),
  // Checkboxes
  new TestCase("Checkboxes Link Navigation Test", [
    new TestStep({
      description: "Navigate to the Checkboxes page and verify URL",
      actions: [
        buildAction.navigateToPage(po, { url: "/" }),
        // buildAction.verifyLinkNavigationWithUrl(po, { linkText: "Checkboxes", expectedUrl: "/checkboxes" })
      ],
    }),
  ]),
  // // Checkboxes
  // new TestCase("Checkboxes Link Navigation Test", [
  //   new TestStep({
  //     description: "Navigate to the Checkboxes page and verify URL",
  //     actions: [
  //       buildAction.navigateToPage(po, { url: "/" }),
  //       // buildAction.verifyLinkNavigationWithUrl(po, { linkText: "Checkboxes", expectedUrl: "/checkboxes" })
  //     ],
  //   }),
  // ]),
];


export const getMainPageTests = (frameworkAdapter: FrameworkAdapter,page?:Page): TestCase[] => {
  const po = new MainPagePO(frameworkAdapter,page);
  return getTests(po);
};
