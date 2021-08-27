import { Controller } from "stimulus";

export default class extends Controller {
  static get values() {
    return {
      method: String,
      action: String,
    };
  }

  submit() {
    let form = this.element.closest("form");
    form.method = this.methodValue;
    form.action = this.actionValue;

    let authenticityTokenInput = document.createElement("input");
    authenticityTokenInput.type = "hidden";
    authenticityTokenInput.name = document.querySelector(
      "meta[name='csrf-param']"
    ).content;
    authenticityTokenInput.value = document.querySelector(
      "meta[name='csrf-token']"
    ).content;
    form.appendChild(authenticityTokenInput);
  }
}
