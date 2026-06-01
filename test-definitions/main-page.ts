import { FrameworkAdapter } from "@lib/framework-adapter";
import { TestCase } from "@lib/test-case";
import { MainPagePO } from "@page-objects/main-page.po";

type LinkNavRow = { linkText: string; expectedUrl: string, skip?: boolean };

const linkNavData: LinkNavRow[] = [
  { linkText: "A/B Testing",         expectedUrl: "/abtest" },
  { linkText: "Add/Remove Elements", expectedUrl: "/add_remove_elements/" },
  // Target page requires HTTP basic auth; the unauthenticated click hangs the browser's
  // page-load event in headless Chrome. Revisit when adding real auth-flow tests.
  { linkText: "Basic Auth",          expectedUrl: "/basic_auth", skip: true },
  { linkText: "Broken Images",       expectedUrl: "/broken_images" },
  { linkText: "Challenging DOM",     expectedUrl: "/challenging_dom" },
  { linkText: "Checkboxes",          expectedUrl: "/checkboxes" },
  { linkText: "Context Menu",        expectedUrl: "/context_menu" },
  { linkText: "Digest Auth",         expectedUrl: "/digest_auth", skip: true }, // Example of a skipped test case
  { linkText: "Disappearing Elements", expectedUrl: "/disappearing_elements" }, 
  { linkText: "Drag and Drop",        expectedUrl: "/drag_and_drop" },
  { linkText: "Dropdown",             expectedUrl: "/dropdown" },
  { linkText: "Dynamic Content",      expectedUrl: "/dynamic_content" },
  { linkText: "Dynamic Controls",     expectedUrl: "/dynamic_controls" },
  { linkText: "Dynamic Loading",      expectedUrl: "/dynamic_loading" },
  { linkText: "Entry Ad",             expectedUrl: "/entry_ad" },
  { linkText: "Exit Intent",          expectedUrl: "/exit_intent" },
  { linkText: "File Download",        expectedUrl: "/download" },
  { linkText: "File Upload",          expectedUrl: "/upload" },
  { linkText: "Floating Menu",        expectedUrl: "/floating_menu" },
  { linkText: "Forgot Password",      expectedUrl: "/forgot_password" },
  { linkText: "Form Authentication", expectedUrl: "/login" },
  { linkText: "Frames",              expectedUrl: "/frames" },
  { linkText: "Geolocation",         expectedUrl: "/geolocation" },
  { linkText: "Horizontal Slider",   expectedUrl: "/horizontal_slider" },
  { linkText: "Hovers",              expectedUrl: "/hovers" },
  { linkText: "Infinite Scroll",     expectedUrl: "/infinite_scroll" },
  { linkText: "Inputs",              expectedUrl: "/inputs" },
  { linkText: "JQuery UI Menus",     expectedUrl: "/jqueryui/menu" },
  { linkText: "JavaScript Alerts",   expectedUrl: "/javascript_alerts" },
  // Page throws an uncaught JS exception by design; Cypress fails the test on any
  // app-level uncaught exception. Skipping rather than globally suppressing.
  { linkText: "JavaScript onload event error", expectedUrl: "/javascript_error", skip: true },
  { linkText: "Key Presses",         expectedUrl: "/key_presses" },
  { linkText: "Large & Deep DOM",    expectedUrl: "/large" },
  { linkText: "Multiple Windows",    expectedUrl: "/windows" },
  { linkText: "Nested Frames",       expectedUrl: "/nested_frames" },
  { linkText: "Notification Messages", expectedUrl: "/notification_message_rendered", skip: true }, // Example of a skipped test case
  { linkText: "Redirect Link",       expectedUrl: "/redirector" },
  // Same auth-challenge issue as /basic_auth — /download_secure is also behind basic auth.
  { linkText: "Secure File Download", expectedUrl: "/download_secure", skip: true },
  { linkText: "Shadow DOM",          expectedUrl: "/shadowdom" },
  { linkText: "Shifting Content",     expectedUrl: "/shifting_content" },
  { linkText: "Slow Resources",      expectedUrl: "/slow" },
  { linkText: "Sortable Data Tables", expectedUrl: "/tables" },
  { linkText: "Status Codes",         expectedUrl: "/status_codes" },
  { linkText: "Typos",                expectedUrl: "/typos" },
  { linkText: "WYSIWYG Editor",        expectedUrl: "/tinymce" },
];

const buildLinkNavTestCase = (po: MainPagePO, row: LinkNavRow): TestCase =>
  new TestCase(`${row.linkText} Link Navigation Test`, [
    po.verifyLinkStep(row),
    po.verifyLinkNavigationStep(row),
  ], row.skip);

const getTests = (po: MainPagePO): TestCase[] =>
  linkNavData.map((row) => buildLinkNavTestCase(po, row));

export const getMainPageTests = (frameworkAdapter: FrameworkAdapter): TestCase[] => {
  const po = new MainPagePO(frameworkAdapter);
  return getTests(po);
};
