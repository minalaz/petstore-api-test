export class Order {
  constructor(id, petId, quantity, shipDate, status, complete) {
    this.id = id;
    this.petId = petId;
    this.quantity = quantity;
    this.shipDate = shipDate;
    this.status = status;
    this.complete = complete;
  }
}
export class User {
  constructor(
    id,
    username,
    firstName,
    lastName,
    email,
    password,
    phone,
    userStatus
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.userStatus = userStatus;
  }
}
