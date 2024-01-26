const { test } = require("@playwright/test");
const statusCode = require("../../support/fixtures/statusCode.json");
import { Methods } from "../../support/helpers/methods";
import { consts } from "../../support/helpers/consts";
import { generateUser } from "../../support/helpers/generateUser";

test.describe("Create user tests", async () => {
  let methods;
  const userData = generateUser.generateRandomUser();
  const userName = userData.username;

  test.beforeEach("SetUp", async ({ request }) => {
    methods = new Methods(request);
  });
  test.afterEach("CleanUp", async ({ context }) => {
    await methods.deleteUser(userName);
    await context.clearCookies();
  });

  test("should create user succesfully", async () => {
    await methods.performUserCreation(
      consts.createUserUrl,
      userData,
      statusCode.ok
    );
  });
  test("shouldn't create user without data in request body", async () => {
    await methods.performUserCreation(
      consts.createUserUrl,
      null,
      statusCode.methodNotAlowed
    );
  });
  test("shouldn't create user on wrong endpoint", async () => {
    await methods.performUserCreation(
      consts.logOutUserUrl,
      userData,
      statusCode.methodNotAlowed
    );
  });
});
