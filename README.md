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
│  Page objects (src/page-object-builder/)             │  page-specific action factories
├──────────────────────────────────────────────────────┤
│  Framework adapter (src/lib/framework-adapter.ts)    │  low-level Playwright/Cypress primitives
└──────────────────────────────────────────────────────┘
```

### Key types

- **`TestCase`** ([src/lib/test-case.ts](src/lib/test-case.ts)) — a framework-agnostic test, composed of one or more `TestStep`s.
- **`TestStep`** ([src/lib/test-step.ts](src/lib/test-step.ts)) — a labeled sequence of `TestAction`s. Its `execute()` chains the actions and returns a single promise the spec can await.
- **`TestAction`** ([src/lib/test-step.ts](src/lib/test-step.ts)) — a pairing of an `actionFn` (from the adapter) and the `actionOptions` to call it with.
- **`FrameworkAdapter`** ([src/lib/framework-adapter.ts](src/lib/framework-adapter.ts)) — abstract class declaring the low-level operations. Concrete implementations: [`PlaywrightTestAction`](playwright/utils/playwright-adapter.ts) and [`CypressTestAction`](cypress/support/cypress-adapter.ts).
- **Page Objects** (e.g. [`MainPagePO`](src/page-object-builder/main-page.po.ts)) — own page-specific knowledge (locators, what "navigate to the A/B Testing page" means). Each method is a factory that binds an adapter call to page-specific arguments and returns a `TestAction`.

### How a test flows

1. A spec file ([playwright/tests/main-page.spec.ts](playwright/tests/main-page.spec.ts) or [cypress/e2e/main-page.cy.ts](cypress/e2e/main-page.cy.ts)) instantiates the framework adapter and calls `getMainPageTests(adapter)`.
2. `getMainPageTests` ([test-definitions/main-page/main-page.ts](test-definitions/main-page/main-page.ts)) builds a `MainPagePO` against that adapter and produces an array of `TestCase`s.
3. The spec iterates the cases, calling `step.execute(page)` for each step. The PO methods return `TestAction`s, the step chains them, and the underlying adapter calls drive the real framework.

The test definitions themselves contain no framework code — swapping Cypress for Playwright is just a matter of which spec file runs.

## Repository layout

```text
src/
  lib/                       # framework-agnostic core (TestCase, TestStep, FrameworkAdapter)
  page-object-builder/       # page objects — action factories per page
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
