import { Controller } from "stimulus";

export default class extends Controller {
  close(event) {
    if (!this.element.hasAttribute("open")) {
      return true;
    }

    if (this.element === event.target || this.element.contains(event.target)) {
      return true;
    }

    this.element.removeAttribute("open");

    return true;
  }
}
