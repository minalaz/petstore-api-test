const dogData = require("../../support/fixtures/dogData.json");

export const consts = {
  //userUrls:
  createUserUrl: "https://petstore.swagger.io/v2/user",
  createListOfUsersUrl: "https://petstore.swagger.io/v2/user/createWithArray",
  logOutUserUrl: "https://petstore.swagger.io/v2/user/logout",

  //petsUrls:
  addOrUpdatePetUrl: "https://petstore.swagger.io/v2/pet",
  petByIdUrl: `https://petstore.swagger.io/v2/pet/${dogData.id}`,
  invalidPetByIdUrl: "https://petstore.swagger.io/v2/pet/doggie",

  //ordersUrls:
  makeOrderUrl: "https://petstore.swagger.io/v2/store/order",
};
