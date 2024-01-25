const { test } = require("@playwright/test");
const statusCode = require("../../support/fixtures/statusCode.json");
import { consts } from "../../support/helpers/consts";
import { generatePet } from "../../support/helpers/generatePet";
import { Methods } from "../../support/helpers/methods";

test.describe("Adding pets tests", async () => {
  let methods;
  const animalData = generatePet.generateRandomPet();
  const updateAnimalData = generatePet.generateRandomPet();
  const updatePetId = updateAnimalData.id;

  test.beforeEach("SetUp", async ({ request }) => {
    methods = new Methods(request);
    await methods.addPetInTheStore(
      consts.addOrUpdatePetUrl,
      animalData,
      statusCode.ok
    );
  });
  test.afterEach("CleanUp", async ({ context }) => {
    await methods.deletePet(updatePetId);
    await context.clearCookies();
  });
  test("should update pet in the store", async () => {
    await methods.updatePetInTheStore(
      consts.addOrUpdatePetUrl,
      updateAnimalData,
      statusCode.ok
    );
  });
});
