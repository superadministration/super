import { Controller } from "stimulus";

export default class extends Controller {
  static get targets() {
    return ["template"];
  }

  call(event) {
    event.preventDefault();

    const unixtime = new Date().getTime();
    let content = this.templateTarget.innerHTML.replace(
      /TEMPLATEINDEX/g,
      unixtime.toString()
    );
    let newElement = up.element.createFromHTML(content);
    up.hello(newElement);
    this.templateTarget.insertAdjacentElement("beforebegin", newElement);
  }
}
