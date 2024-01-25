const { test } = require("@playwright/test");
const { generateOrder } = require("../../support/helpers/generateOrder");
const statusCode = require("../../support/fixtures/statusCode.json");
import { Methods } from "../../support/helpers/methods";
import { consts } from "../../support/helpers/consts";

test.describe("Making orders", async () => {
  let methods;
  const orderData = generateOrder.generateRandomOrder();
  const orderId = orderData.id;
  test.beforeEach("SetUp", async ({ request }) => {
    methods = new Methods(request);
  });
  test.afterEach("CleanUp", async ({ context }) => {
    await methods.deleteOrder(orderId);
    await context.clearCookies();
  });

  test("should place an order for a pet", async () => {
    await methods.makeOrder(consts.makeOrderUrl, orderData, statusCode.ok);
  });
  test("shouldn't make order without data", async () => {
    await methods.makeOrder(consts.makeOrderUrl, null, statusCode.badRequest);
  });
});
