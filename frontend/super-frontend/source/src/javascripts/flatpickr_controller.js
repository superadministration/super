import { Controller } from "stimulus";
import flatpickr from "flatpickr";

export default class extends Controller {
  static get values() {
    return {
      options: Object,
    };
  }

  connect() {
    this.flatpickrInstance = flatpickr(this.element, this.optionsValue);
  }
}
