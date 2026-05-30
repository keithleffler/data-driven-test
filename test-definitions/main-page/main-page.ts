import { FrameworkAdapter } from "@lib/framework-adapter";
import { TestStep } from "@lib/index";
import { TestCase } from "@lib/test-case";
import { MainPagePO } from "@page-objects/main-page.po";

type LinkNavRow = { linkText: string; expectedUrl: string };

const linkNavData: LinkNavRow[] = [
  { linkText: "A/B Testing",         expectedUrl: "/abtest" },
  { linkText: "Add/Remove Elements", expectedUrl: "/add_remove_elements/" },
  { linkText: "Broken Images",       expectedUrl: "/broken_images" },
  { linkText: "Challenging DOM",     expectedUrl: "/challenging_dom" },
  { linkText: "Checkboxes",          expectedUrl: "/checkboxes" },
];

const buildLinkNavTestCase = (po: MainPagePO, { linkText, expectedUrl }: LinkNavRow): TestCase =>
  new TestCase(`${linkText} Link Navigation Test`, [
    new TestStep({
      description: "Navigate to home page",
      actions: [po.navigateToPage({ url: "/" })],
    }),
    new TestStep({
      description: `Verify ${linkText} link`,
      actions: [
        po.verifyLinkExists({ linkText }),
        po.verifyLinkHref({ linkText, expectedUrl }),
      ],
    }),
    new TestStep({
      description: `Click ${linkText} link and verify navigation`,
      actions: [
        po.clickLink({ linkText }),
        po.verifyUrl({ expectedUrl }),
      ],
    }),
  ]);

const getTests = (po: MainPagePO): TestCase[] =>
  linkNavData.map((row) => buildLinkNavTestCase(po, row));

export const getMainPageTests = (frameworkAdapter: FrameworkAdapter): TestCase[] => {
  const po = new MainPagePO(frameworkAdapter);
  return getTests(po);
};
