const { test } = require("@playwright/test");
const statusCode = require("../../support/fixtures/statusCode.json");
import { Methods } from "../../support/helpers/methods";
import { consts } from "../../support/helpers/consts";
import { generateUser } from "../../support/helpers/generateUser";

test.describe("List of users tests", async () => {
  let methods;
  const usersData = generateUser.generateListOfUsers(2);
  const firstUser = usersData[0];
  const firstUsername = firstUser.username;
  const secondUSer = usersData[1];
  const secondUsername = secondUSer.username;

  test.beforeEach("SetUp", async ({ request }) => {
    methods = new Methods(request);
  });

  test.afterEach("CleanUp", async ({ context }) => {
    await methods.deleteUser(firstUsername);
    await methods.deleteUser(secondUsername);
    await context.clearCookies();
  });
  test("should create list of Users", async () => {
    await methods.performUserCreation(
      consts.createListOfUsersUrl,
      usersData,
      statusCode.ok
    );
  });
});
