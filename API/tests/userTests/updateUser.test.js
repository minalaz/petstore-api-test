const { test } = require("@playwright/test");
import { consts } from "../../support/helpers/consts";
import { generateUser } from "../../support/helpers/generateUser";
import { Methods } from "../../support/helpers/methods";
const statusCode = require("../../support/fixtures/statusCode.json");

test.describe("Update user", async () => {
  let methods;
  const userData = generateUser.generateRandomUser();
  const userUpdateData = generateUser.generateRandomUser();
  const userName = userData.username;
  const password = userData.password;
  test.beforeEach("SetUp", async ({ request }) => {
    methods = new Methods(request);
    await methods.performUserCreation(
      consts.createUserUrl,
      userData,
      statusCode.ok
    );
    await methods.loginUser(userName, password, statusCode.ok);
  });
  test.afterEach("CleanUp", async ({ context }) => {
    await context.clearCookies();
  });
  test("should succesfully update user", async () => {
    await methods.updateUser(userName, userUpdateData, statusCode.ok);
  });
  test("shouldn't update user without data", async () => {
    userName, null, statusCode.unsupported;
  });
});
