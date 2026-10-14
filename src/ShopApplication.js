import { ShoppingCart } from "../modules/shopping-cart/index.js";

/**
 * Connects the page to ShoppingCart.
 * The module handles quantities and price calculations.
 */
export class ShopApplication {
  #cart = new ShoppingCart();
  #productList;
  #cartList;
  #cartTotal;
  #emptyCartMessage;
  #products = [
    { name: "Rooibos", price: 60, description: "Mjukt och fylligt rött te." },
    { name: "Grönt te", price: 50, description: "Ett lätt te med frisk smak." },
    { name: "Svart te", price: 45, description: "Ett klassiskt te med fyllig smak." },
    { name: "Pepparmynta", price: 55, description: "Ett örtte med sval mintsmak." },
    { name: "Kamomill", price: 50, description: "Ett milt örtte med blommig smak." },
  ];

  constructor() {
    this.#productList = document.getElementById("product-list");
    this.#cartList = document.getElementById("cart-list");
    this.#cartTotal = document.getElementById("cart-total");
    this.#emptyCartMessage = document.getElementById("cart-empty");
  }

  start() {
    this.#productList.replaceChildren();
    for (const product of this.#products) {
      this.#productList.append(this.#createProductElement(product));
    }
    this.#renderCart();
  }

  /**
   * @param {object} product - A product from the shop's product list.
   * @returns {HTMLLIElement} A product card with an add button.
   */
  #createProductElement(product) {
    const element = document.createElement("li");
    element.className = "product";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = `${product.price} kr`;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Lägg i varukorg";
    button.setAttribute("aria-label", `Lägg ${product.name} i varukorgen`);
    button.addEventListener("click", () => this.#addProduct(product));

    element.append(name, description, price, button);
    return element;
  }

  #addProduct(product) {
    this.#cart.addItem(product.name, product.price, 1);
    this.#renderCart();
  }

  #renderCart() {
    // Rebuild the list to avoid duplicate rows and outdated quantities.
    this.#cartList.replaceChildren();
    this.#emptyCartMessage.hidden = !this.#cart.isEmpty();

    for (const item of this.#cart.getItems()) {
      const element = document.createElement("li");
      element.textContent = `${item.getName()} (${item.getQuantity()} st) – ${item.getTotalPrice()} kr`;
      this.#cartList.append(element);
    }

    this.#cartTotal.textContent = `${this.#cart.getTotalPrice()} kr`;
  }
}
