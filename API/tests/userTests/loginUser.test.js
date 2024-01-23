const { test} = require("@playwright/test");
import { consts } from "../../support/helpers/consts";
import { Methods } from "../../support/helpers/methods";
const validCredentials = require("../../support/fixtures/validCredentials.json");
const statusCode = require("../../support/fixtures/statusCode.json");
const type = require("../../support/fixtures/type.json");
const message = require("../../support/fixtures/message.json");

test.describe("Login tests", () => {
  let methods;
  test.beforeEach("Create user", async ({ request }) => {
    methods = new Methods(request);
    await methods.performUserCreation(
      consts.createUserUrl,
      validCredentials,
      statusCode.ok,
      type.unknown,
      message.validUserMessage
    );
  });
  test.afterEach("CleanUp", async ({ context }) => {
    await context.clearCookies();
  });
  test("should login with valid login credentials", async () => {
    await methods.loginUser(
      consts.loginUserUrl,
      statusCode.ok,
      type.unknown,
      message.succesfulyLoginMessage
    );
  });

  test("should succesfully logOut", async () => {
    await methods.loginUser(
      consts.logOutUserUrl,
      statusCode.ok,
      type.unknown,
      message.ok
    );
  });
});
