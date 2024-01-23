import { generateOrder } from "./generateOrder";

const { expect } = require("@playwright/test");
export class Methods {
  constructor(request) {
    this.request = request;
  }
  //User methods:
  async performUserCreation(
    url,
    requestBody,
    expectedCode,
    expectedType,
    expectedMessage
  ) {
    const response = await this.request.post(url, {
      data: requestBody,
    });
    expect(response.status()).toBe(expectedCode);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("code", expectedCode);
    expect(responseBody).toHaveProperty("type", expectedType);
    expect(responseBody).toHaveProperty("message", expectedMessage);
  }
  async loginUser(url, expectedCode, expectedType, expectedMessage) {
    const response = await this.request.get(url);
    expect(response.status()).toBe(expectedCode);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("code", expectedCode);
    expect(responseBody).toHaveProperty("type", expectedType);
    const message = responseBody.message;
    expect(message).toContain(expectedMessage);
  }
  async updateUser(
    url,
    newPasswordUpdate,
    expectedCode,
    expectedType,
    expectedMessage
  ) {
    const response = await this.request.put(url, { data: newPasswordUpdate });
    expect(response.status()).toBe(expectedCode);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("code", expectedCode);
    expect(responseBody).toHaveProperty("type", expectedType);
    expect(responseBody).toHaveProperty("message", expectedMessage);
  }
  //Pets methods:
  async addPetInTheStore(url, data, expectedCode) {
    const response = await this.request.post(url, {
      data: data,
    });
    expect(response.status()).toBe(expectedCode);
    const responseBody = await response.json();
    expect(responseBody).toEqual(data);
  }
  async updatePetInTheStore(url, data, expectedCode) {
    const response = await this.request.put(url, { data: data });
    expect(response.status()).toBe(expectedCode);
    const responseBody = await response.json();
    expect(responseBody).toEqual(data);
  }
  async getPetById(url, expectedCode, expectedResponse) {
    const response = await this.request.get(url);
    expect(response.status()).toBe(expectedCode);
    const responseBody = await response.json();
    expect(responseBody).toEqual(expectedResponse);
  }
  async getPetsByStatus(status, expectedCode) {
    const response = await this.request.get(
      `https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`
    );
    expect(response.status()).toBe(expectedCode);
    const pets = await response.json();

    for (const pet of pets) {
      expect(pet.status).toBe(status);
    }
  }
  //Orders methods:
  async makeOrder(url, data, expectedCode) {
    const response = await this.request.post(url, {
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response.status()).toBe(expectedCode);
    const responseBody = await response.json();
    expect(responseBody).toEqual(data);
  }
}
