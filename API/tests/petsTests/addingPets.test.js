const { test } = require("@playwright/test");
const dogData = require("../../support/fixtures/dogData.json");
const statusCode = require("../../support/fixtures/statusCode.json");
import { consts } from "../../support/helpers/consts";
import { Methods } from "../../support/helpers/methods";

test.describe("Adding pets tests", async () => {
  let methods;
  test.beforeEach("SetUp", async ({ request }) => {
    methods = new Methods(request);
  });
  test.afterEach("CleanUp", async ({ context }) => {
    await context.clearCookies();
  });
  test("should add dog in the store", async () => {
    await methods.addPetInTheStore(
      consts.addOrUpdatePetUrl,
      dogData,
      statusCode.ok
    );
  });
});
