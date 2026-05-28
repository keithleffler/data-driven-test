
import {LinkNavigationStepDefinition} from "@lib/test-definitions/test-steps/link-navigation-step";
const linkNavigationSteps: LinkNavigationStepDefinition[] = [
  // A/B Testing
  {
    description: "Navigate to the A/B Testing page and verify URL",
    sourcePage: "/",
    text: "A/B Testing",
    expectedUrl: "https://the-internet.herokuapp.com/abtest",
  },
  // Add/Remove Elements
  {
    description: "Navigate to the Add/Remove Elements page and verify URL",
    sourcePage: "/",
    text: "Add/Remove Elements",
    expectedUrl: "https://the-internet.herokuapp.com/add_remove_elements",
  },
  // Basic Auth
  {
    description: "Navigate to the Basic Auth page and verify URL",
    sourcePage: "/",
    text: "Basic Auth",
    expectedUrl: "https://the-internet.herokuapp.com/basic_auth",
  },
  // Broken Images
  {
    description: "Navigate to the Broken Images page and verify URL",
    sourcePage: "/",
    text: "Broken Images",
    expectedUrl: "https://the-internet.herokuapp.com/broken_images",
  },
  // Challenging DOM
  {
    description: "Navigate to the Challenging DOM page and verify URL",
    sourcePage: "/",
    text: "Challenging DOM",
    expectedUrl: "https://the-internet.herokuapp.com/challenging_dom",
  },
  // Checkboxes
  {
    description: "Navigate to the Checkboxes page and verify URL",
    sourcePage: "/",
    text: "Checkboxes",
    expectedUrl: "https://the-internet.herokuapp.com/checkboxes",
  },
];
