import { ShoppingCart } from "../modules/shopping-cart/index.js";
import { CustomerValidator } from "./CustomerValidator.js";

/**
 * Connects the page to ShoppingCart.
 * The module handles quantities and price calculations.
 */
export class ShopApplication {
  #cart = new ShoppingCart();
  #productList;
  #cartList;
  #cartTotal;
  #cartSubtotal;
  #cartDiscount;
  #discountInput;
  #discountError;
  #emptyCartMessage;
  #customerValidator = new CustomerValidator();
  #customerName;
  #customerEmail;
  #customerErrors;
  #customerStatus;
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
    this.#productList = document.getElementById("product-list");
    this.#cartList = document.getElementById("cart-list");
    this.#cartTotal = document.getElementById("cart-total");
    this.#cartSubtotal = document.getElementById("cart-subtotal");
    this.#cartDiscount = document.getElementById("cart-discount");
    this.#discountInput = document.getElementById("discount-input");
    this.#discountError = document.getElementById("discount-error");
    this.#emptyCartMessage = document.getElementById("cart-empty");
    this.#customerName = document.getElementById("customer-name");
    this.#customerEmail = document.getElementById("customer-email");
    this.#customerErrors = document.getElementById("customer-errors");
    this.#customerStatus = document.getElementById("customer-status");

    document
      .getElementById("customer-form")
      .addEventListener("submit", (event) => this.#checkCustomer(event));

    document
      .getElementById("discount-form")
      .addEventListener("submit", (event) => this.#applyDiscount(event));
    document
      .getElementById("clear-cart")
      .addEventListener("click", () => this.#clearCart());
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
    price.textContent = this.#formatPrice(product.price);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Lägg i varukorg";
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
      this.#cartList.append(this.#createCartElement(item));
    }

    const subtotal = this.#cart.getSubtotal();
    const total = this.#cart.getTotalPrice();
    const discountAmount = subtotal - total;

    this.#cartSubtotal.textContent = this.#formatPrice(subtotal);
    this.#cartDiscount.textContent = `${this.#cart.getDiscount()} % (${this.#formatPrice(discountAmount)})`;
    this.#cartTotal.textContent = this.#formatPrice(total);
  }

  #createCartElement(item) {
    const element = document.createElement("li");

    const details = document.createElement("span");
    details.className = "cart-item-details";
    details.textContent = `${item.getName()} (${item.getQuantity()} st) – ${this.#formatPrice(item.getTotalPrice())}`;

    const controls = document.createElement("div");
    controls.className = "cart-controls";

    const decreaseButton = document.createElement("button");
    decreaseButton.type = "button";
    decreaseButton.textContent = "−";
    // Removing a product is a separate action and decreasing stops at one.
    decreaseButton.disabled = item.getQuantity() === 1;
    decreaseButton.setAttribute("aria-label", `Minska antal ${item.getName()}`);
    decreaseButton.addEventListener("click", () =>
      this.#decreaseQuantity(item.getName()),
    );

    const increaseButton = document.createElement("button");
    increaseButton.type = "button";
    increaseButton.textContent = "+";
    increaseButton.setAttribute("aria-label", `Öka antal ${item.getName()}`);
    increaseButton.addEventListener("click", () =>
      this.#increaseQuantity(item.getName()),
    );

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Ta bort";
    removeButton.addEventListener("click", () =>
      this.#removeProduct(item.getName()),
    );

    controls.append(decreaseButton, increaseButton, removeButton);
    element.append(details, controls);
    return element;
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

  #applyDiscount(event) {
    // Handle the discount here without reloading the page.
    event.preventDefault();
    const percent = this.#discountInput.valueAsNumber;

    if (!this.#cart.applyDiscount(percent)) {
      this.#discountError.textContent =
        "Ange en rabatt mellan 0 och 100 procent.";
      return;
    }

    this.#discountError.textContent = "";
    this.#renderCart();
  }

  #clearCart() {
    this.#cart.clearCart();
    this.#discountInput.value = "0";
    this.#discountError.textContent = "";
    this.#renderCart();
  }

  #checkCustomer(event) {
    event.preventDefault();
    const customer = {
      name: this.#customerName.value.trim(),
      email: this.#customerEmail.value.trim(),
    };
    const errors = this.#customerValidator.getErrors(customer);

    this.#customerErrors.replaceChildren();
    this.#customerStatus.textContent = "";
    for (const message of errors) {
      const element = document.createElement("li");
      element.textContent = message;
      this.#customerErrors.append(element);
    }

    if (errors.length === 0) {
      this.#customerStatus.textContent = "Kunduppgifterna är giltiga.";
    }
  }

  #formatPrice(price) {
    // Round prices for display but the module keeps the calculation values.
    const formattedPrice = price.toFixed(2);
    return formattedPrice + " kr";
  }
}
