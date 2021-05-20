import { Controller } from "stimulus";

export default class extends Controller {
  static get targets() {
    return ["pocket", "content"];
  }

  static get values() {
    return {
      identifier: String,
      tabContainerGetter: String,
    };
  }

  connect() {
    let tabContainer = this.element[this.tabContainerGetterValue];
    if (tabContainer.activeTabIdentifier === this.identifierValue) {
      this.show();
    } else {
      this.hide();
    }
  }

  toggle() {
    if (this.hasContentTarget) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (this.hasContentTarget) {
      return;
    }

    let pocketContent = this.pocketTarget.content.cloneNode(true);
    this.element.appendChild(pocketContent);
  }

  hide() {
    if (!this.hasContentTarget) {
      return;
    }

    this.contentTarget.remove();
  }
}
