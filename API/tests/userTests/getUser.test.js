const { test } = require("@playwright/test");
import { consts } from "../../support/helpers/consts";
import { generateUser } from "../../support/helpers/generateUser";
import { Methods } from "../../support/helpers/methods";
const statusCode = require("../../support/fixtures/statusCode.json");

test.describe("Login and logOut tests", () => {
  let methods;
  const userData = generateUser.generateRandomUser();
  const userName = userData.username;
  const password = userData.password;
  test.beforeEach("Create user", async ({ request }) => {
    methods = new Methods(request);
    await methods.performUserCreation(
      consts.createUserUrl,
      userData,
      statusCode.ok
    );
  });
  test.afterEach("CleanUp", async ({ context }) => {
    await methods.deleteUser(userName);
    await context.clearCookies();
  });
  test("should login with valid login credentials", async () => {
    await methods.loginUser(userName, password, statusCode.ok);
  });
  test("should succesfully logOut", async () => {
    await methods.logoutUser(consts.logOutUserUrl, statusCode.ok);
  });
});
