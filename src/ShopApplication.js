export class ShopApplication {
  #productList;
  #products = [
    { name: "Rooibos", price: 60, description: "Mjukt och fylligt rött te." },
    { name: "Grönt te", price: 50, description: "Ett lätt te med frisk smak." },
    { name: "Svart te", price: 45, description: "Ett klassiskt te med fyllig smak." },
    { name: "Pepparmynta", price: 55, description: "Ett örtte med sval mintsmak." },
    { name: "Kamomill", price: 50, description: "Ett milt örtte med blommig smak." },
  ];

  constructor() {
    this.#productList = document.getElementById("product-list");
  }

  start() {
    this.#productList.replaceChildren();
    for (const product of this.#products) {
      this.#productList.append(this.#createProductElement(product));
    }
  }

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

    element.append(name, description, price);
    return element;
  }
}
