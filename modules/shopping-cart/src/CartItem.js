export class CartItem {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity) {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return false;
    }

    this.quantity = quantity;
    return true;
  }

  increaseQuantity(quantity) {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return false;
    }

    this.quantity += quantity;
    return true;
  }

  decreaseQuantity(quantity) {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return false;
    }

    // Keep the quantity positive; removing a cart item is a separate operation.
    if (this.quantity - quantity <= 0) {
      return false;
    }

    this.quantity -= quantity;
    return true;
  }

  getTotalPrice() {
    return this.price * this.quantity;
  }
}
