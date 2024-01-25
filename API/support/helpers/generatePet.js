const faker = require("faker");
import { Category, Tag, Pet } from "./model";
export const generatePet = {
  generateRandomPet() {
    const category = new Category(faker.datatype.number(), faker.random.word());

    const tags = new Array(faker.datatype.number({ min: 1, max: 5 }))
      .fill(null)
      .map(() => new Tag(faker.datatype.number(), faker.random.word()));

    const pet = new Pet(
      faker.datatype.number(),
      category,
      faker.name.firstName(),
      [faker.image.imageUrl()],
      tags,
      faker.random.arrayElement(["available", "pending", "sold"])
    );

    return pet;
  },
};
