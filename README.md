# Data-driven, Multi-framework Test Example

A demonstration of data-driven test automation that runs the same test definitions on both Cypress and Playwright.

## Motivation

This example is motivated by work at previous projects, where the organization was in the early stages of migrating from a very large number of Cucumber scenarios on Cypress to Playwright (non-Cucumber). Scenarios usually tested more than one thing. AI analysis revealed there were a small number of test equivalence classes, but a large input surface from variations of user type, product type, and state of residence.

## Objectives

1. Abstract test types (text/context verification, link navigation, etc.) so a test definition reads as data, not framework code.
2. Abstract test input and expected output so the large input surface can be expressed efficiently.
3. Provide a transparent path from Cypress to Playwright: the same test definitions execute under either framework.

## Architecture

The codebase is organized into four layers. Each layer has a single responsibility, and only the bottom layer knows which framework is in use.

```text
┌──────────────────────────────────────────────────────┐
│  Spec files (playwright/tests, cypress/e2e)          │  framework-specific entry point
├──────────────────────────────────────────────────────┤
│  Test definitions (test-definitions/)                │  data: TestCases composed of TestSteps
├──────────────────────────────────────────────────────┤
│  Page objects (src/page-object-builder/)             │  page-specific step factories
├──────────────────────────────────────────────────────┤
│  Framework adapter (src/lib/framework-adapter.ts)    │  low-level Playwright/Cypress primitives
└──────────────────────────────────────────────────────┘
```

### Key types

- **`TestCase`** ([src/lib/test-case.ts](src/lib/test-case.ts)) — a framework-agnostic test, composed of one or more `TestStep`s.
- **`TestStep`** ([src/lib/test-step.ts](src/lib/test-step.ts)) — a labeled sequence of `TestAction`s. Its `execute()` chains the actions and returns a single promise the spec can await.
- **`TestAction`** ([src/lib/test-step.ts](src/lib/test-step.ts)) — a pairing of an `actionFn` (from the adapter) and the `actionOptions` to call it with.
- **`FrameworkAdapter`** ([src/lib/framework-adapter.ts](src/lib/framework-adapter.ts)) — abstract class declaring the low-level operations. Concrete implementations: [`PlaywrightTestAction`](playwright/utils/playwright-adapter.ts) and [`CypressTestAction`](cypress/support/cypress-adapter.ts).
- **Page Objects** (e.g. [`MainPagePO`](src/page-object-builder/main-page.po.ts)) — own page-specific knowledge: locators, step composition, and step wording. Public methods return `TestStep`s (e.g. `verifyLinkStep`, `verifyLinkNavigationStep`), describing *what* the test verifies. Protected action methods underneath each step return `TestAction`s and bind adapter calls to page-specific arguments — these are not exposed to test definitions, so tests compose at the step level and the PO owns the question of "what actions make up verifying a link."

### How a test flows

1. A spec file ([playwright/tests/main-page.spec.ts](playwright/tests/main-page.spec.ts) or [cypress/e2e/main-page.cy.ts](cypress/e2e/main-page.cy.ts)) instantiates the framework adapter and calls `getMainPageTests(adapter)`.
2. `getMainPageTests` ([test-definitions/main-page/main-page.ts](test-definitions/main-page/main-page.ts)) builds a `MainPagePO` against that adapter and produces an array of `TestCase`s.
3. The spec iterates the cases, calling `step.execute(page)` for each step. Each step contains a sequence of `TestAction`s composed by the PO; `execute` chains them and the underlying adapter calls drive the real framework.

The test definitions themselves contain no framework code — swapping Cypress for Playwright is just a matter of which spec file runs.

## Where test data lives

The "data" in *data-driven testing* can live in several places, and the right answer depends on **who owns the data and how it gets edited**. This project currently keeps everything inline in TypeScript, but the design anticipates moving some data sets out as the project grows.

### Current state — inline TypeScript

Test data today is an inline `const` array in [test-definitions/main-page/main-page.ts](test-definitions/main-page/main-page.ts):

```ts
const linkNavData: LinkNavRow[] = [
  { linkText: "A/B Testing",         expectedUrl: "/abtest" },
  { linkText: "Add/Remove Elements", expectedUrl: "/add_remove_elements/" },
  // ...
];
```

A single factory function turns each row into a `TestCase`. Adding a sixth link is a one-line change.

Inline storage wins here because the data set is small, dev-owned, lives under source control alongside the page it describes, and gets full TypeScript type checking — a typo in a field name is a compile error.

### When to externalize

Two signals would push a data set out of TypeScript and into a separate file:

1. **A different audience needs to edit it.** If a QA engineer or SME should be able to add a row without touching `.ts` code, the data needs a format they already use. For tabular data that usually means CSV (opens in any spreadsheet).
2. **A test management system is in the loop.** If test cases are authored in TestRail / Xray / Zephyr and exported, or if results need to round-trip back, CSV is typically the lingua franca — most TMS tools import and export it natively. In that scenario, CSV is the right call even for small, dev-owned data sets, because the import/export plumbing already exists.

The motivating use case for this project (a user × product × state input matrix) clearly belongs in CSV: it's large, the matrix owners aren't necessarily TypeScript developers, and it's the kind of data a TMS would care about. The link-navigation data on the home page does not: it's small, it changes when the page changes (which is also a code change), and only developers will ever edit it.

### A note on test management integration

This project doesn't currently integrate with a TMS, and the test cases don't carry external test IDs. If/when a TMS is introduced, two concerns would shape the design:

- **Stable test IDs** would need to live on each data row (e.g., a `testId: "TC-1234"` field) and flow through to the runner's output (typically JUnit XML, which both Playwright and Cypress can emit).
- **Direction of authority** — whether test cases are authored in code and reported to the TMS, or authored in the TMS and consumed by the runner — drives whether data stays inline or moves to CSV. The latter requires CSV.

These are decisions worth making before adopting a TMS, not after, since they're hard to retrofit.

## Repository layout

```text
src/
  lib/                       # framework-agnostic core (TestCase, TestStep, FrameworkAdapter)
  page-object-builder/       # page objects — step factories per page
test-definitions/            # data-only test cases, grouped by page
playwright/
  tests/                     # Playwright specs
  utils/                     # PlaywrightTestAction (adapter impl)
cypress/
  e2e/                       # Cypress specs
  support/                   # CypressTestAction (adapter impl)
```

Path aliases (see [tsconfig.json](tsconfig.json)):

- `@lib/*` → `src/lib/*`
- `@page-objects/*` → `src/page-object-builder/*`
- `@test-data/*` → `test-definitions/*`

## Running the tests

```bash
pnpm install

pnpm test:playwright   # Playwright, list reporter
pnpm test:cypress      # Cypress headless
pnpm cypress:open      # Cypress interactive
```
