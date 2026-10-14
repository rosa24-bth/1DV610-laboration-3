import { ShoppingCart } from "../modules/shopping-cart/index.js";
import { CustomerValidator } from "./CustomerValidator.js";
import { ShopView } from "./ShopView.js";

/**
 * Coordinates the shopping cart, customer validation and page updates.
 */
export class ShopApplication {
  #cart = new ShoppingCart();
  #customerValidator = new CustomerValidator();
  #view;
  #products = [
    { name: "Rooibos", price: 60, description: "Mjukt och fylligt rött te." },
    { name: "Grönt te", price: 50, description: "Ett lätt te med frisk smak." },
    {
      name: "Svart te",
      price: 45,
      description: "Ett klassiskt te med fyllig smak.",
    },
    {
      name: "Pepparmynta",
      price: 55,
      description: "Ett örtte med sval mintsmak.",
    },
    {
      name: "Kamomill",
      price: 50,
      description: "Ett milt örtte med blommig smak.",
    },
  ];

  constructor() {
    // Give the view functions to call when the customer uses the page.
    this.#view = new ShopView({
      addProduct: (product) => this.#addProduct(product),
      increaseQuantity: (name) => this.#increaseQuantity(name),
      decreaseQuantity: (name) => this.#decreaseQuantity(name),
      removeProduct: (name) => this.#removeProduct(name),
      applyDiscount: (percent) => this.#applyDiscount(percent),
      clearCart: () => this.#clearCart(),
      placeOrder: (customer) => this.#placeOrder(customer),
    });
  }

  start() {
    this.#view.renderProducts(this.#products);
    this.#renderCart();
  }

  #addProduct(product) {
    this.#cart.addItem(product.name, product.price, 1);
    this.#renderCart();
  }

  #increaseQuantity(name) {
    this.#cart.increaseItemQuantity(name);
    this.#renderCart();
  }

  #decreaseQuantity(name) {
    this.#cart.decreaseItemQuantity(name);
    this.#renderCart();
  }

  #removeProduct(name) {
    this.#cart.removeItem(name);
    this.#renderCart();
  }

  #renderCart() {
    this.#view.renderCart(this.#cart);
  }

  #applyDiscount(percent) {
    if (!this.#cart.applyDiscount(percent)) {
      this.#view.showDiscountError("Ange en rabatt mellan 0 och 100 procent.");
      return;
    }

    this.#view.showDiscountError("");
    this.#renderCart();
  }

  #clearCart() {
    this.#cart.clearCart();
    this.#view.resetDiscount();
    this.#renderCart();
  }

  #placeOrder(customer) {
    const errors = this.#customerValidator.getErrors(customer);
    if (this.#cart.isEmpty()) {
      errors.push("Lägg minst en produkt i varukorgen innan du beställer.");
    }

    this.#view.showCustomerErrors(errors);
    this.#view.hideOrder();
    if (errors.length > 0) {
      return;
    }

    this.#view.showOrder(customer, this.#cart);
  }
}
