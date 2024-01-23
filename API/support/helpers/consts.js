const validCredentials = require("../fixtures/validCredentials.json");
const dogData = require("../../support/fixtures/dogData.json");

export const consts = {
  //userUrls:
  createUserUrl: "https://petstore.swagger.io/v2/user",
  createListOfUsersUrl: "https://petstore.swagger.io/v2/user/createWithArray",
  loginUserUrl: `https://petstore.swagger.io/v2/user/login?username=${validCredentials.username}&password=${validCredentials.password}`,
  logOutUserUrl: "https://petstore.swagger.io/v2/user/logout",
  updateUserUrl: `https://petstore.swagger.io/v2/user/${validCredentials.username}`,

  //petsUrls:
  addOrUpdatePetUrl: "https://petstore.swagger.io/v2/pet",
  petByIdUrl: `https://petstore.swagger.io/v2/pet/${dogData.id}`,
  invalidPetByIdUrl: "https://petstore.swagger.io/v2/pet/doggie",

  //ordersUrls:
  makeOrderUrl: "https://petstore.swagger.io/v2/store/order"
};
