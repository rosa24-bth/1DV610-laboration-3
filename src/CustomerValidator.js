import Validation from "../modules/form-validation/src/Validation.js";
import Field from "../modules/form-validation/src/Field.js";
import {
  RequiredRule,
  EmailRule,
} from "../modules/form-validation/src/Rule.js";

export class CustomerValidator {
  #validation = new Validation();

  constructor() {
    const nameField = new Field("name");
    nameField.addRule(new RequiredRule("Ange ditt namn."));

    const emailField = new Field("email");
    emailField.addRule(new RequiredRule("Ange din e-postadress."));
    emailField.addRule(
      new EmailRule("Ange en e-postadress med giltigt format."),
    );

    this.#validation.addField(nameField);
    this.#validation.addField(emailField);
  }

  /**
   * @param {object} customer - The customer's name and email as strings.
   * @returns {string[]} Error messages, or an empty array for valid details.
   */
  getErrors(customer) {
    const result = this.#validation.validate(customer);
    const messages = [];

    // Give the page plain messages instead of the modules error objects.
    for (const error of result.errors) {
      messages.push(error.errorMessage);
    }

    return messages;
  }
}
