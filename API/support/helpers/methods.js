const { expect } = require("@playwright/test");
const message = require("../fixtures/message.json");
const type = require("../fixtures/type.json");
const statusCode = require("../fixtures/statusCode.json");

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
      expect(responseBody).toHaveProperty("code", expectedCode); //asserting body of the response
      expect(responseBody).toHaveProperty("type", type.unknown);
      expect(typeof responseBody.message).toBe("string");
    } else {
      console.log("error");
    }
  }
  async loginUser(username, password, expectedCode) {
    const response = await this.request.get(
      `https://petstore.swagger.io/v2/user/login?username=${username}&password=${password}`
    );
    expect(response.status()).toBe(expectedCode); //asserting status code
    if (expectedCode === statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty("code", expectedCode); //asserting body of the response
      expect(responseBody).toHaveProperty("type", type.unknown);
      expect(responseBody.message).toContain(message.succesfulyLoginMessage);
    } else {
      console.log("error");
    }
  }
  async logoutUser(url, expectedCode) {
    const response = await this.request.get(url);
    expect(response.status()).toBe(expectedCode); //asserting status code
    if (expectedCode === statusCode.ok) {
      const responseBody = await response.json();

      expect(responseBody).toHaveProperty("code", expectedCode); //asserting body of the response
      expect(responseBody).toHaveProperty("type", type.unknown);
      expect(responseBody.message).toContain(message.ok);
    } else {
      console.log("error");
    }
  }

  async updateUser(username, newPasswordUpdate, expectedCode) {
    const response = await this.request.put(
      `https://petstore.swagger.io/v2/user/${username}`,
      { data: newPasswordUpdate }
    );
    expect(response.status()).toBe(expectedCode); //asserting status code
    const responseBody = await response.json();

    if (expectedCode === statusCode.ok) {
      expect(responseBody).toHaveProperty("code", expectedCode); //asserting body of the response
      expect(responseBody).toHaveProperty("type", "unknown");
      expect(responseBody).toHaveProperty("message");
    } else {
      console.log("error");
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
    if (expectedCode === expectedCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toEqual(data); //asserting body of the response
    } else {
      console.log("error");
    }
  }
  async updatePetInTheStore(url, data, expectedCode) {
    const response = await this.request.put(url, { data: data });
    expect(response.status()).toBe(expectedCode); //asserting status code
    if (expectedCode === expectedCode.ok) {
      const responseBody = await response.json(); //asserting body of the response
      expect(responseBody).toEqual(data);
    } else {
      console.log("error");
    }
  }
  async getPetById(id, expectedCode, expectedResponse) {
    const response = await this.request.get(
      `https://petstore.swagger.io/v2/pet/${id}`
    );
    expect(response.status()).toBe(expectedCode); //asserting status code
    if (expectedCode === statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toEqual(expectedResponse); //asserting body of the response
    } else {
      console.log("error");
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
        expect(pet.status).toBe(status); //asserting body of the response
      }
    }
  }
  async deletePet(petID) {
    const response = await this.request.delete(
      `https://petstore.swagger.io/v2/pet/${petID}`,
      { headers: { api_key: "special-key" } }
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
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response.status()).toBe(expectedCode); //asserting status code
    if (expectedCode === statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toEqual(data); //asserting body of the response
    } else {
      console.log("error");
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
