const { test } = require("@playwright/test");
const statusCode = require("../../support/fixtures/statusCode.json");
import { consts } from "../../support/helpers/consts";
import { Methods } from "../../support/helpers/methods";
import { generatePet } from "../../support/helpers/generatePet";

test.describe("Adding pets tests", async () => {
  let methods;
  const animalData = generatePet.generateRandomPet();
  const petId = animalData.id;

  test.beforeEach("SetUp", async ({ request }) => {
    methods = new Methods(request);
  });
  test.afterEach("CleanUp", async ({ context }) => {
    await methods.deletePet(petId);
    await context.clearCookies();
  });
  test("should add pet in the store", async () => {
    await methods.addPetInTheStore(
      consts.addOrUpdatePetUrl,
      animalData,
      statusCode.ok
    );
  });
  test("shouldn't add pet without data", async () => {
    await methods.addPetInTheStore(
      consts.addOrUpdatePetUrl,
      null,
      statusCode.methodNotAlowed
    );
  });
});
