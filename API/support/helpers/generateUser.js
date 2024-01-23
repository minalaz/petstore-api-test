const faker = require("faker");
import { User } from "./model";

export const generateUser = {
  generateRandomUser() {
    const user = new User();
    user.username = faker.internet.userName(); // Generiše nasumično korisničko ime
    user.firstName = faker.name.firstName(); // Generiše nasumično ime
    user.lastName = faker.name.lastName(); // Generiše nasumično prezime
    user.email = faker.internet.email(); // Generiše nasumičnu email adresu
    user.password = faker.internet.password(); // Generiše nasumičnu lozinku
    user.phone = faker.phone.phoneNumber(); // Generiše nasumični telefonski broj
    user.userStatus = faker.random.number(); // Generiše nasumičan broj za status korisnika
    return user;
  },
};
