/**
 * Displays shop data and passes the user's actions to ShopApplication.
 */
export class ShopView {
  #actions;
  #productList;
  #cartList;
  #cartTotal;
  #cartSubtotal;
  #cartDiscount;
  #discountInput;
  #discountError;
  #emptyCartMessage;
  #customerName;
  #customerEmail;
  #customerErrors;
  #orderSummary;

  /**
   * @param {object} actions - Functions provided by ShopApplication for the users actions.
   */
  constructor(actions) {
    this.#actions = actions;
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
    this.#orderSummary = document.getElementById("order-summary");

    document
      .getElementById("customer-form")
      .addEventListener("submit", (event) => this.#submitOrder(event));
    document
      .getElementById("discount-form")
      .addEventListener("submit", (event) => this.#submitDiscount(event));
    document
      .getElementById("clear-cart")
      .addEventListener("click", () => this.#actions.clearCart());
  }

  renderProducts(products) {
    this.#productList.replaceChildren();
    for (const product of products) {
      this.#productList.append(this.#createProductElement(product));
    }
  }

  renderCart(cart) {
    // Rebuild the list to avoid duplicate rows and outdated quantities.
    this.#cartList.replaceChildren();
    this.#emptyCartMessage.hidden = !cart.isEmpty();

    for (const item of cart.getItems()) {
      this.#cartList.append(this.#createCartElement(item));
    }

    const subtotal = cart.getSubtotal();
    const total = cart.getTotalPrice();
    const discountAmount = subtotal - total;

    this.#cartSubtotal.textContent = this.#formatPrice(subtotal);
    this.#cartDiscount.textContent = `${cart.getDiscount()} % (${this.#formatPrice(discountAmount)})`;
    this.#cartTotal.textContent = this.#formatPrice(total);
  }

  showDiscountError(message) {
    this.#discountError.textContent = message;
  }

  resetDiscount() {
    this.#discountInput.value = "0";
    this.showDiscountError("");
  }

  showCustomerErrors(errors) {
    this.#customerErrors.replaceChildren();
    for (const message of errors) {
      const element = document.createElement("li");
      element.textContent = message;
      this.#customerErrors.append(element);
    }
  }

  hideOrder() {
    this.#orderSummary.hidden = true;
  }

  showOrder(customer, cart) {
    const heading = document.createElement("h2");
    heading.textContent = "Din beställning";

    const customerDetails = document.createElement("p");
    customerDetails.textContent = `${customer.name} – ${customer.email}`;

    // Copy the values into the summary so later cart changes do not change this order.
    const list = document.createElement("ul");
    for (const item of cart.getItems()) {
      const element = document.createElement("li");
      element.textContent = `${item.getName()} (${item.getQuantity()} st) – ${this.#formatPrice(item.getTotalPrice())}`;
      list.append(element);
    }

    const subtotal = document.createElement("p");
    subtotal.textContent = `Delsumma: ${this.#formatPrice(cart.getSubtotal())}`;

    const discount = document.createElement("p");
    discount.textContent = `Rabatt: ${cart.getDiscount()} %`;

    const total = document.createElement("p");
    total.className = "cart-total";
    total.textContent = `Totalt: ${this.#formatPrice(cart.getTotalPrice())}`;

    this.#orderSummary.replaceChildren(
      heading,
      customerDetails,
      list,
      subtotal,
      discount,
      total,
    );
    this.#orderSummary.hidden = false;
  }

  /**
   * @param {object} product - A product from the shops product list.
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
    button.addEventListener("click", () => this.#actions.addProduct(product));

    element.append(name, description, price, button);
    return element;
  }

  #createCartElement(item) {
    const element = document.createElement("li");

    const details = document.createElement("span");
    details.className = "cart-item-details";
    details.textContent = `${item.getName()} (${item.getQuantity()} st) – ${this.#formatPrice(item.getTotalPrice())}`;

    const controls = this.#createCartControls(item);

    element.append(details, controls);
    return element;
  }

  #createCartControls(item) {
    const controls = document.createElement("div");
    controls.className = "cart-controls";

    const decreaseButton = document.createElement("button");
    decreaseButton.type = "button";
    decreaseButton.textContent = "−";
    // Removing a product is a separate action and decreasing stops at one.
    decreaseButton.disabled = item.getQuantity() === 1;
    decreaseButton.setAttribute("aria-label", `Minska antal ${item.getName()}`);
    decreaseButton.addEventListener("click", () =>
      this.#actions.decreaseQuantity(item.getName()),
    );

    const increaseButton = document.createElement("button");
    increaseButton.type = "button";
    increaseButton.textContent = "+";
    increaseButton.setAttribute("aria-label", `Öka antal ${item.getName()}`);
    increaseButton.addEventListener("click", () =>
      this.#actions.increaseQuantity(item.getName()),
    );

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Ta bort";
    removeButton.addEventListener("click", () =>
      this.#actions.removeProduct(item.getName()),
    );

    controls.append(decreaseButton, increaseButton, removeButton);
    return controls;
  }

  #submitDiscount(event) {
    // Handle the discount here without reloading the page.
    event.preventDefault();
    this.#actions.applyDiscount(this.#discountInput.valueAsNumber);
  }

  #submitOrder(event) {
    event.preventDefault();
    const customer = {
      name: this.#customerName.value.trim(),
      email: this.#customerEmail.value.trim(),
    };
    this.#actions.placeOrder(customer);
  }

  #formatPrice(price) {
    // Round prices for display but the module keeps the calculation values.
    const formattedPrice = price.toFixed(2);
    return formattedPrice + " kr";
  }
}
