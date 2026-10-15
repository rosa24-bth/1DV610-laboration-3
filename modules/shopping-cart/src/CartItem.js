export class CartItem {
  /**
   * Creates a cart item.
   * @param {string} name - Product name.
   * @param {number} price - Price per item.
   * @param {number} quantity - Starting quantity.
   */
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  /**
   * @returns {string} Product name.
   */
  getName() {
    return this.name;
  }

  /**
   * @returns {number} Price per item.
   */
  getPrice() {
    return this.price;
  }

  /**
   * @returns {number} Current product quantity.
   */
  getQuantity() {
    return this.quantity;
  }

  /**
   * Sets the quantity to a new value.
   * @param {number} quantity - Positive, finite new quantity.
   * @returns {boolean} True if updated, or false if the quantity is invalid.
   */
  setQuantity(quantity) {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return false;
    }

    this.quantity = quantity;
    return true;
  }

  /**
   * Adds to the current quantity.
   * @param {number} quantity - Positive, finite quantity to add.
   * @returns {boolean} True if increased, or false if the quantity is invalid.
   */
  increaseQuantity(quantity) {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return false;
    }

    this.quantity += quantity;
    return true;
  }

  /**
   * Decreases the quantity while keeping it above zero.
   * @param {number} quantity - Positive, finite quantity to subtract.
   * @returns {boolean} True if decreased, or false if the quantity is invalid
   * or the result would be zero or below.
   */
  decreaseQuantity(quantity) {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return false;
    }

    if (this.quantity - quantity <= 0) {
      return false;
    }

    this.quantity -= quantity;
    return true;
  }

  /**
   * @returns {number} Price per item multiplied by quantity.
   */
  getTotalPrice() {
    return this.price * this.quantity;
  }
}
