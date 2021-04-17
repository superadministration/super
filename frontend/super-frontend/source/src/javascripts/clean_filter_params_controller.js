import { Controller } from "stimulus";

export default class extends Controller {
  call(event) {
    this.element
      .querySelectorAll("[data-controller='clean-filter-param']")
      .forEach(
        function(el) {
          let controller = this.application.getControllerForElementAndIdentifier(
            el,
            "clean-filter-param"
          );
          controller.call();
        }.bind(this)
      );
  }
}
