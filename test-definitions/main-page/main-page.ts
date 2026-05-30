import { FrameworkAdapter } from "@lib/framework-adapter";
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

const buildLinkNavTestCase = (po: MainPagePO, row: LinkNavRow): TestCase =>
  new TestCase(`${row.linkText} Link Navigation Test`, [
    po.navigateToPageStep({ url: "/" }),
    po.verifyLinkStep(row),
    po.verifyLinkNavigationStep(row),
  ]);

const getTests = (po: MainPagePO): TestCase[] =>
  linkNavData.map((row) => buildLinkNavTestCase(po, row));

export const getMainPageTests = (frameworkAdapter: FrameworkAdapter): TestCase[] => {
  const po = new MainPagePO(frameworkAdapter);
  return getTests(po);
};
