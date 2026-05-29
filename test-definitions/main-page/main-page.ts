import { FrameworkAdapter } from "@lib/framework-adapter";
import { TestStep } from "@lib/index";
import { TestCase } from "@lib/test-case";
import { MainPagePO } from "@page-objects/main-page.po";

const getTests = (po: MainPagePO): TestCase[] => [
  // A/B Testing
  new TestCase("A/B Testing Link Navigation Test", [
    new TestStep({
      description: "Navigate to home page",
      actions: [
        po.navigateToPage({ url: "/" }),
      ],
    }),
    new TestStep({
      description: "Verify A/B Testing link",
      actions: [
        po.verifyLinkExists({ linkText: "A/B Testing" }),
        po.verifyLinkHref({ linkText: "A/B Testing", expectedUrl: "/abtest" }),
      ],
    }),
    new TestStep({
      description: "Click A/B Testing link and verify navigation",
      actions: [
        po.clickLink({ linkText: "A/B Testing" }),
        po.verifyUrl({ expectedUrl: "/abtest" }),
      ],
    }),
  ]),

  // Add/Remove Elements
  new TestCase("Add/Remove Elements Link Navigation Test", [
    new TestStep({
      description: "Navigate to home page",
      actions: [
        po.navigateToPage({ url: "/" }),
      ],
    }),
    new TestStep({
      description: "Verify Add/Remove Elements link",
      actions: [
        po.verifyLinkExists({ linkText: "Add/Remove Elements" }),
        po.verifyLinkHref({ linkText: "Add/Remove Elements", expectedUrl: "/add_remove_elements/" }),
      ],
    }),
    new TestStep({
      description: "Click Add/Remove Elements link and verify navigation",
      actions: [
        po.clickLink({ linkText: "Add/Remove Elements" }),
        po.verifyUrl({ expectedUrl: "/add_remove_elements/" }),
      ],
    }),
  ]),

  // Broken Images
  new TestCase("Broken Images Link Navigation Test", [
    new TestStep({
      description: "Navigate to home page",
      actions: [
        po.navigateToPage({ url: "/" }),
      ],
    }),
    new TestStep({
      description: "Verify Broken Images link",
      actions: [
        po.verifyLinkExists({ linkText: "Broken Images" }),
        po.verifyLinkHref({ linkText: "Broken Images", expectedUrl: "/broken_images" }),
      ],
    }),
    new TestStep({
      description: "Click Broken Images link and verify navigation",
      actions: [
        po.clickLink({ linkText: "Broken Images" }),
        po.verifyUrl({ expectedUrl: "/broken_images" }),
      ],
    }),
  ]),

  // Challenging DOM
  new TestCase("Challenging DOM Link Navigation Test", [
    new TestStep({
      description: "Navigate to home page",
      actions: [
        po.navigateToPage({ url: "/" }),
      ],
    }),
    new TestStep({
      description: "Verify Challenging DOM link",
      actions: [
        po.verifyLinkExists({ linkText: "Challenging DOM" }),
        po.verifyLinkHref({ linkText: "Challenging DOM", expectedUrl: "/challenging_dom" }),
      ],
    }),
    new TestStep({
      description: "Click Challenging DOM link and verify navigation",
      actions: [
        po.clickLink({ linkText: "Challenging DOM" }),
        po.verifyUrl({ expectedUrl: "/challenging_dom" }),
      ],
    }),
  ]),

  // Checkboxes
  new TestCase("Checkboxes Link Navigation Test", [
    new TestStep({
      description: "Navigate to home page",
      actions: [
        po.navigateToPage({ url: "/" }),
      ],
    }),
    new TestStep({
      description: "Verify Checkboxes link",
      actions: [
        po.verifyLinkExists({ linkText: "Checkboxes" }),
        po.verifyLinkHref({ linkText: "Checkboxes", expectedUrl: "/checkboxes" }),
      ],
    }),
    new TestStep({
      description: "Click Checkboxes link and verify navigation",
      actions: [
        po.clickLink({ linkText: "Checkboxes" }),
        po.verifyUrl({ expectedUrl: "/checkboxes" }),
      ],
    }),
  ]),
];

export const getMainPageTests = (frameworkAdapter: FrameworkAdapter): TestCase[] => {
  const po = new MainPagePO(frameworkAdapter);
  return getTests(po);
};
