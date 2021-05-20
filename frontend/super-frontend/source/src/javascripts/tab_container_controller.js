import { Controller } from "stimulus";

export default class extends Controller {
  static get targets() {
    return ["control", "tab"];
  }

  static get values() {
    return {
      tabIdentifierGetter: String,
      tabControllerName: String,
    };
  }

  connect() {
    this.tabTargets.forEach(tab => {
      tab.tabContainer = this;
    });
  }

  get activeTabIdentifier() {
    return this.controlTarget.value;
  }

  change(event) {
    this.update(event.target.value);
  }

  update(newActiveTabIdentifier) {
    this.tabTargets.forEach(tab => {
      let tabController = this.application.getControllerForElementAndIdentifier(
        tab,
        this.tabControllerNameValue
      );
      if (
        tab.dataset[this.tabIdentifierGetterValue] == newActiveTabIdentifier
      ) {
        tabController.show();
      } else {
        tabController.hide();
      }
    });
  }
}
