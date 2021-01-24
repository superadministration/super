import { Controller } from "stimulus";

export default class extends Controller {
  call(event) {
    event.preventDefault();
    this.element.remove();
  }
}
