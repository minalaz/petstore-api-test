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
    expect(response.status()).toBe(expectedCode);
    if (expectedCode == statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty("code", expectedCode);
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
    expect(response.status()).toBe(expectedCode);
    if (expectedCode == statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty("code", expectedCode);
      expect(responseBody).toHaveProperty("type", type.unknown);
      expect(responseBody.message).toContain(message.succesfulyLoginMessage);
    } else {
      console.log("error");
    }
  }
  async logoutUser(url, expectedCode) {
    const response = await this.request.get(url);
    expect(response.status()).toBe(expectedCode);
    if (expectedCode == statusCode.ok) {
      const responseBody = await response.json();

      expect(responseBody).toHaveProperty("code", expectedCode);
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
    expect(response.status()).toBe(expectedCode);
    const responseBody = await response.json();

    if ((expectedCode = 200)) {
      expect(responseBody).toHaveProperty("code", expectedCode);
      expect(responseBody).toHaveProperty("type", "unknown");
      expect(responseBody).toHaveProperty("message");
    } else {
      console.log("error");
    }
  }

  //Pets methods:
  async addPetInTheStore(url, data, expectedCode) {
    const response = await this.request.post(url, {
      data: data,
    });
    expect(response.status()).toBe(expectedCode);
    if (expectedCode == expectedCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toEqual(data);
    } else {
      console.log("error");
    }
  }
  async updatePetInTheStore(url, data, expectedCode) {
    const response = await this.request.put(url, { data: data });
    expect(response.status()).toBe(expectedCode);
    if (expectedCode == expectedCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toEqual(data);
    } else {
      console.log("error");
    }
  }
  async getPetById(url, expectedCode, expectedResponse) {
    const response = await this.request.get(url);
    expect(response.status()).toBe(expectedCode);
    if (expectedCode == statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toEqual(expectedResponse);
    } else {
      console.log("error");
    }
  }
  async getPetsByStatus(status, expectedCode) {
    const response = await this.request.get(
      `https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`
    );
    expect(response.status()).toBe(expectedCode);
    if (expectedCode == statusCode.ok) {
      const pets = await response.json();
      for (const pet of pets) {
        expect(pet.status).toBe(status);
      }
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
    if (expectedCode == statusCode.ok) {
      const responseBody = await response.json();
      expect(responseBody).toEqual(data);
    } else {
      console.log("error");
    }
  }
}
