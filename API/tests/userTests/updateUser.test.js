const { test } = require("@playwright/test");
import { consts } from "../../support/helpers/consts";
import { Methods } from "../../support/helpers/methods";
const validCredentials = require("../../support/fixtures/validCredentials.json");
const statusCode = require("../../support/fixtures/statusCode.json");
const type = require("../../support/fixtures/type.json");
const message = require("../../support/fixtures/message.json");
const userUpdateData = require("../../support/fixtures/userUpdate.json");
test.describe("Update user", async () => {
  let methods;
  test.beforeEach("SetUp", async ({ request }) => {
    methods = new Methods(request);
    await methods.performUserCreation(
      consts.createUserUrl,
      validCredentials,
      statusCode.ok,
      type.unknown,
      message.validUserMessage
    );
    await methods.loginUser(
      consts.loginUserUrl,
      statusCode.ok,
      type.unknown,
      message.succesfulyLoginMessage
    );
  });
  test.afterEach("CleanUp", async ({ context }) => {
    await context.clearCookies();
  });
  test("should succesfully update user's password", async () => {
    await methods.updateUser(
      consts.updateUserUrl,
      userUpdateData,
      statusCode.ok,
      type.unknown,
      message.validUserMessage
    );
  });
});
