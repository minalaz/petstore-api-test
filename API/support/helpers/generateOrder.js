import { randomizingData } from "./randomizingData";
import { Order } from "./model";

export const generateOrder = {
  generateRandomOrder() {
    const order = new Order();
    order.id = randomizingData.randomizeLargeNumber();
    order.petId = randomizingData.randomizeNumber();
    order.quantity = randomizingData.randomizeNumber();
    order.shipDate = randomizingData.randomDate();
    order.status = randomizingData.randomStatus();
    order.complete = randomizingData.randomBoolean();
    return order;
  },
};
