import { CartItem } from "./CartItem.js";

export class ShoppingCart {
  /**
   * Creates an empty new cart.
   */
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  /**
   * Adds item. Adding the same product name increases its quantity and keeps
   * its original price.
   * @param {string} name - Product name.
   * @param {number} price - Positive, finite price per item.
   * @param {number} quantity - Positive, finite quantity to add.
   * @returns {boolean} True on success and false for an empty name or
   * invalid price or quantity.
   */
  addItem(name, price, quantity) {
    if (!name) {
      return false;
    }

    if (!Number.isFinite(price) || price <= 0) {
      return false;
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      return false;
    }

    const existingItem = this.getItem(name);
    if (existingItem) {
      existingItem.increaseQuantity(quantity);
      return true;
    }

    const item = new CartItem(name, price, quantity);
    this.items.push(item);
    return true;
  }

  /**
   * Removes a product from the cart.
   * @param {string} name - Name of the product to remove.
   * @returns {boolean} True if removed, or false if the product was not found.
   */
  removeItem(name) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].getName() === name) {
        this.items.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  /**
   * Sets a products quantity to a new value.
   * @param {string} name - Name of the product to update.
   * @param {number} quantity - Positive, finite new quantity.
   * @returns {boolean} True if updated, or false if the quantity is invalid
   * or the product was not found.
   */
  updateQuantity(name, quantity) {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return false;
    }

    const item = this.getItem(name);
    if (!item) {
      return false;
    }

    item.setQuantity(quantity);
    return true;
  }

  /**
   * Adds to a product's current qauntity.
   * @param {string} name - Name of the product to update.
   * @param {number} [quantity=1] - Positive, finite quantity to add.
   * @returns {boolean} True if increased, or false if the quantity is invalid
   * or the product was not found.
   */
  increaseItemQuantity(name, quantity = 1) {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return false;
    }

    const item = this.getItem(name);
    if (!item) {
      return false;
    }

    item.increaseQuantity(quantity);
    return true;
  }

  /**
   * Decreases to zero or below are rejected. Use removeItem() to remove a product.
   * @param {string} name - Product name.
   * @param {number} [quantity=1] - Positive, finite quantity to subtract.
   * @returns {boolean} True if decreased, or false if the quantity is invalid,
   * the product was not found or the result would be zero or below.
   */
  decreaseItemQuantity(name, quantity = 1) {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return false;
    }

    const item = this.getItem(name);
    if (!item) {
      return false;
    }

    return item.decreaseQuantity(quantity);
  }

  /**
   * @param {string} name - Product name to look up.
   * @returns {CartItem|null} The matching item, or null if it does not exist.
   */
  getItem(name) {
    for (const item of this.items) {
      if (item.getName() === name) {
        return item;
      }
    }

    return null;
  }

  /**
   * Returns the cart's own array. Changes to this array also affect the cart.
   * @returns {CartItem[]} The cart's items.
   */
  getItems() {
    return this.items;
  }

  /**
   * @param {string} name - Product name to look up.
   * @returns {boolean} Whether a product with this name exists in the cart.
   */
  hasItem(name) {
    return this.getItem(name) !== null;
  }

  /**
   * @returns {number} Number of different product names in the cart.
   */
  getNumberOfProducts() {
    return this.items.length;
  }

  /**
   * @returns {number} Sum of all product quantities.
   */
  getTotalItems() {
    let totalItems = 0;

    for (const item of this.items) {
      totalItems += item.getQuantity();
    }

    return totalItems;
  }

  /**
   * @returns {number} Total price of all cart items before discount, without rounding.
   */
  getSubtotal() {
    let subtotal = 0;

    for (const item of this.items) {
      subtotal += item.getTotalPrice();
    }

    return subtotal;
  }

  /**
   * Applies a percentage discount to the cart.
   * Invalid values leave the current discount unchanged.
   * @param {number} percent - Finite discount percentage from 0 to 100.
   * @returns {boolean} True if the discount was applied, otherwise false.
   */
  applyDiscount(percent) {
    if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
      return false;
    }

    this.discount = percent;
    return true;
  }

  /**
   * Resets the discount to zero percent.
   */
  removeDiscount() {
    this.discount = 0;
  }

  /**
   * @returns {number} Current discount percentage, from 0 to 100.
   */
  getDiscount() {
    return this.discount;
  }

  /**
   * @returns {number} Total price after discount, without rounding.
   */
  getTotalPrice() {
    const subtotal = this.getSubtotal();

    const discountAmount = subtotal * (this.discount / 100);

    return subtotal - discountAmount;
  }

  /**
   * @returns {boolean} Whether the cart has no products.
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Removes all products and resets the discount to zero percent.
   */
  clearCart() {
    this.items = [];
    this.discount = 0;
  }
}
