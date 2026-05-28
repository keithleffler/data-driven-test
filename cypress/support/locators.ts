import { ElementLocatorType, ElementLocator } from "@lib/locator/locator";

export const byText = (text: string): ElementLocator<ElementLocatorType> => {
  return new ElementLocator<ElementLocatorType>(`//*[text()="${text}"]`);
}