const { expect } = require("@playwright/test");
const statusCode = require("../fixtures/statusCode.json");
const responses = require("../fixtures/responses.json");
import { consts } from "../helpers/consts";
const api_key = process.env.api_key;

export class Methods {
  constructor(request) {
    this.request = request;
  }
  //User methods:
  async performUserCreation(url, requestBody, expectedCode) {
    const response = await this.request.post(url, {
      data: requestBody,
    });
    expect(response.status()).toBe(expectedCode); //asserting status code
    if (expectedCode === statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody.code).toBe(expectedCode); //asserting value for the code property from the response body
      expect(responseBody.type).toBe(responses.typeUnknown); //asserting value for the type property from the response body
      if (url === consts.createUserUrl) {
        expect(typeof responseBody.message).toBe("string"); //asserting value for the message property from the response body
      } else {
        expect(responseBody.message).toBe(responses.messageOk); //asserting different possibility for the message value.
      }
    } else {
      console.log("Status code: " + response.status());
    }
  }

  async loginUser(username, password, expectedCode) {
    const response = await this.request.get(
      `https://petstore.swagger.io/v2/user/login?username=${username}&password=${password}`
    );
    expect(response.status()).toBe(expectedCode);
    //asserting status code
    if (expectedCode === statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody.code).toBe(expectedCode); //asserting value for the code property from the response body
      expect(responseBody.type).toBe(responses.typeUnknown); //asserting value for the type property from the response body
      expect(responseBody.message).toContain(
        responses.messageSuccesLoginMessage
      ); //asserting value for the message property from the response body
    } else {
      console.log("Status code: " + expectedCode);
    }
  }
  async logoutUser(url, expectedCode) {
    const response = await this.request.get(url);
    expect(response.status()).toBe(expectedCode); //asserting status code
    if (expectedCode === statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody.code).toBe(expectedCode); //asserting value for the code property from the response body
      expect(responseBody.type).toBe(responses.typeUnknown); //asserting value for the type property from the response body
      expect(responseBody.message).toBe(responses.messageOk); //asserting value for the message property from the response body
    } else {
      console.log("Status code: " + expectedCode);
    }
  }

  async updateUser(username, newPasswordUpdate, expectedCode) {
    const response = await this.request.put(
      `https://petstore.swagger.io/v2/user/${username}`,
      {
        data: newPasswordUpdate,
      }
    );
    expect(response.status()).toBe(expectedCode); //asserting status code
    if (expectedCode === statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody.code).toBe(expectedCode); //asserting value for the code property from the response body
      expect(responseBody.type).toBe(responses.typeUnknown); //asserting value for the type property from the response body
      expect(typeof responseBody.message).toBe("string"); //asserting value for the message property from the response body
    } else {
      console.log("Status code: " + expectedCode);
    }
  }
  async deleteUser(username) {
    const response = await this.request.delete(
      `https://petstore.swagger.io/v2/user/${username}`
    );
    const actualStatusCode = response.status();
    const isStatusOk = actualStatusCode === statusCode.ok; //when deleted, there is incosistent behavior in the response
    const isStatusNotFound = actualStatusCode === statusCode.notFound; //but both this status codes are showing that the user is deleted

    expect(isStatusOk || isStatusNotFound).toBeTruthy();
  }

  //Pets methods:
  async addPetInTheStore(url, data, expectedCode) {
    const response = await this.request.post(url, {
      data: data,
    });
    expect(response.status()).toBe(expectedCode); //asserting status code
    if (expectedCode === statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toEqual(data); //asserting content from the response body
    } else {
      console.log("Status code: " + expectedCode);
    }
  }
  async updatePetInTheStore(url, data, expectedCode) {
    const response = await this.request.put(url, { data: data });
    expect(response.status()).toBe(expectedCode); //asserting status code
    if (expectedCode === statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toEqual(data); //asserting content from the response body
    } else {
      console.log("Status code: " + expectedCode);
    }
  }
  async getPetById(id, expectedCode, expectedResponse) {
    const response = await this.request.get(
      `https://petstore.swagger.io/v2/pet/${id}`
    );
    expect(response.status()).toBe(expectedCode); //asserting status code of the response
    if (expectedCode === statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toEqual(expectedResponse); //asserting content from the response body
    } else if (expectedCode === statusCode.notFound) {
      const responseBody = await response.json();
      expect(responseBody.code).toBe(responses.codeNotFound); //asserting code property content from the response body
      expect(responseBody.type).toBe(responses.typeError); //asserting type property content from the response body
      expect(responseBody.message).toBe(responses.messagePetNotFound);
    } else {
      console.log("Status code: " + expectedCode);
    }
  }
  async getPetsByStatus(status, expectedCode) {
    const response = await this.request.get(
      `https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`
    );
    expect(response.status()).toBe(expectedCode); //asserting status code
    if (expectedCode === statusCode.ok) {
      const pets = await response.json();
      for (const pet of pets) {
        expect(pet.status).toBe(status); //asserting status of the pets
      }
    } else {
      console.log("Status code: " + expectedCode);
    }
  }
  async deletePet(petID) {
    const response = await this.request.delete(
      `https://petstore.swagger.io/v2/pet/${petID}`,
      {
        headers: api_key,
      }
    );
    const actualStatusCode = response.status();
    const isStatusOk = actualStatusCode === statusCode.ok; //when deleted, there is incosistent behavior in the response
    const isStatusNotFound = actualStatusCode === statusCode.notFound; //but both this status codes are showing that the pet is deleted

    expect(isStatusOk || isStatusNotFound).toBeTruthy();
  }
  //Orders methods:
  async makeOrder(url, data, expectedCode) {
    const response = await this.request.post(url, {
      data: data,
      headers: { "Content-type": "application/json" },
    });
    expect(response.status()).toBe(expectedCode); //asserting status code
    if (expectedCode === statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toEqual(data); //asserting content from the response body
    } else if (expectedCode === statusCode.badRequest) {
      const responseBody = await response.json();
      expect(responseBody.code).toBe(responses.codeNotFound); //asserting value for the code property from the response body
      expect(responseBody.type).toBe(responses.typeError); //asserting value for the type property from the response body
      expect(responseBody.message).toBe(responses.messageNoData); //asserting value for the message property from the response body
    } else {
      console.log("Status code: " + expectedCode);
    }
  }

  async deleteOrder(orderId) {
    const response = await this.request.delete(
      `https://petstore.swagger.io/v2/store/order/${orderId}`
    );
    const actualStatusCode = response.status();
    const isStatusOk = actualStatusCode === statusCode.ok; //when deleted, there is incosistent behavior in the response
    const isStatusNotFound = actualStatusCode === statusCode.notFound; //but both this status codes are showing that the order is deleted

    expect(isStatusOk || isStatusNotFound).toBeTruthy();
  }
}
