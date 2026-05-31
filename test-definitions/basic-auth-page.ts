import { FrameworkAdapter } from "@lib/framework-adapter";
import { TestCase } from "@lib/test-case";
import { BasicAuthPagePO } from "@page-objects/basic-auth-page.po";

export type BasicAuthRow = {
  description: string;
  username: string;
  password: string;
  expectSuccess: boolean;  // true: assert "Congratulations!"; false: assert 401 / "Not authorized"
  skip?: boolean;
};

export const basicAuthData: BasicAuthRow[] = [
  { description: "valid credentials", username: "admin", password: "admin", expectSuccess: true },
  { description: "wrong password",    username: "admin", password: "wrong", expectSuccess: false },
  { description: "wrong username",    username: "wrong", password: "admin", expectSuccess: false },
];

const buildBasicAuthTestCase = (po: BasicAuthPagePO, row: BasicAuthRow): TestCase =>
  new TestCase(
    `Basic Auth: ${row.description}`,
    [row.expectSuccess ? po.verifyAuthenticatedStep() : po.verifyAuthFailedStep()],
    row.skip,
  );

const getTests = (po: BasicAuthPagePO): TestCase[] =>
  basicAuthData.map((row) => buildBasicAuthTestCase(po, row));

export const getBasicAuthTests = (frameworkAdapter: FrameworkAdapter): TestCase[] => {
  const po = new BasicAuthPagePO(frameworkAdapter);
  return getTests(po);
};
