export class Order {
  constructor(id, petId, quantity, shipDate, status, complete) {
    this.id = id;
    this.petId = petId;
    this.quantity = quantity;
    this.shipDate = shipDate;
    this.status = status;
    this.complete = complete;
  }
  toJson() {
    return {
      id: this.id,
      petId: this.petId,
      quantity: this.quantity,
      shipDate: this.shipDate,
      status: this.status,
      complete: this.complete,
    };
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
  toJson() {
    return {
      id: this.id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      userStatus: this.userStatus,
    };
  }
}
export class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
export class Tag {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
export class Pet {
  constructor(id, category, name, photoUrls, tags, status) {
    this.id = id;
    this.category = new Category(category.id, category.name);
    this.name = name;
    this.photoUrls = photoUrls;
    this.tags = tags.map((tag) => new Tag(tag.id, tag.name));
    this.status = status;
  }
  toJson() {
    return {
      id: this.id,
      category: {
        id: this.category.id,
        name: this.category.name,
      },
      name: this.name,
      photoUrls: this.photoUrls,
      tags: this.tags.map((tag) => ({ id: tag.id, name: tag.name })),
      status: this.status,
    };
  }
}
