# Petstore API Testing Project

## Project Description

The Petstore API Testing Project is designed for automated testing of the [Petstore API](https://petstore.swagger.io/v2) using Playwright. This project aims to provide comprehensive and reliable tests for various aspects of the Petstore API.

## API Testing

**[UserTests](https://github.com/minalaz/petstore-api-test/tree/main/API/tests/userTests)**

- The test scripts are made for creating user, list of users, as well as login and updating user.

**[PetsTests](https://github.com/minalaz/petstore-api-test/tree/main/API/tests/petsTests)**

- The test scripts are made for adding pets to store, as well as updating them and getting them by, by status...

**[OrderTests](https://github.com/minalaz/petstore-api-test/tree/main/API/tests/orderTests)**

- The test scripts that are focused on making orders in the Petstore.

## Features

- Automated API testing.
- Utilizing Playwright for test automation.
- Generating random test data using Faker.js.
- Covering a range of API endpoints including user, pet, and store operations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Before setting up the project, ensure you have the following tools installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Visual Studio Code (VS Code)**: [Download Visual Studio Code](https://code.visualstudio.com/)

## Getting started

**Clone the repository**

```bash
git clone https://github.com/minalaz/petstore-api-test
```

**Install dependencies** Navigate to the project and run

```bash
npm install
```

**Run the tests**

```bash
npx playwright test
```

## Author:

Mina Lazicic
