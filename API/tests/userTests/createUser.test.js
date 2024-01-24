const { test } = require("@playwright/test");
const statusCode = require("../../support/fixtures/statusCode.json");
const listOfUsersCredentials = require("../../support/fixtures/listOfUsersCredentials.json");
import { Methods } from "../../support/helpers/methods";
import { consts } from "../../support/helpers/consts";
import { generateUser } from "../../support/helpers/generateUser";

test.describe("Create user tests", async () => {
  let methods;

  test.beforeEach("SetUp", async ({ request }) => {
    methods = new Methods(request);
  });
  test.afterEach("CleanUp", async ({ context }) => {
    await context.clearCookies();
  });

  test("should create user succesfully", async () => {
    await methods.performUserCreation(
      consts.createUserUrl,
      generateUser.generateRandomUser(),
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
  test("shouldn't create user with list of users inside of request body", async () => {
    await methods.performUserCreation(
      consts.createUserUrl,
      listOfUsersCredentials,
      statusCode.serverError
    );
  });
  test("should create list of users", async () => {
    await methods.performUserCreation(
      consts.createListOfUsersUrl,
      listOfUsersCredentials,
      statusCode.ok
    );
  });
});
