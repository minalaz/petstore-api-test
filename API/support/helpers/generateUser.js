const faker = require("faker");
import { User } from "./model";

export const generateUser = {
  generateRandomUser() {
    const user = new User();
    user.username = faker.internet.userName();
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.phone = faker.phone.phoneNumber();
    user.userStatus = faker.random.number();
    return user;
  },
};
