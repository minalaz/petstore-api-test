const { test } = require("@playwright/test");
const statusCode = require("../../support/fixtures/statusCode.json");
const petsStatus = require("../../support/fixtures/petsStatus.json");
const invalidGetResponse = require("../../support/fixtures/invalidGetResponse.json");
import { consts } from "../../support/helpers/consts";
import { generatePet } from "../../support/helpers/generatePet";
import { Methods } from "../../support/helpers/methods";

test.describe("Adding pets tests", async () => {
  let methods;
  const animalData = generatePet.generateRandomPet();
  const petId = animalData.id;
  test.beforeEach("SetUp", async ({ request }) => {
    methods = new Methods(request);
    await methods.addPetInTheStore(
      consts.addOrUpdatePetUrl,
      animalData,
      statusCode.ok
    );
  });
  test.afterEach("CleanUp", async ({ context }) => {
    await methods.deletePet(petId);
    await context.clearCookies();
  });
  test("should get added pet", async () => {
    await methods.getPetById(petId, statusCode.ok, animalData);
  });
  test("All pets should have status 'sold'", async () => {
    await methods.getPetsByStatus(petsStatus.sold, statusCode.ok);
  });
  test("All pets should have status 'available'", async () => {
    await methods.getPetsByStatus(petsStatus.available, statusCode.ok);
  });
  test("All pets should have status 'pending'", async () => {
    await methods.getPetsByStatus(petsStatus.pending, statusCode.ok);
  });
  test("shouldn't get pet with wrong url", async () => {
    await methods.getPetById(
      consts.invalidPetByIdUrl,
      statusCode.notFound,
      invalidGetResponse
    );
  });
});
