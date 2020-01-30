import { Controller } from "stimulus";

export default class extends Controller {
  templateTarget: Element | undefined;

  static targets = ["template"];

  call(event: Event) {
    event.preventDefault();

    if (this.templateTarget) {
      const unixtime = new Date().getTime();
      let content = this.templateTarget.innerHTML.replace(
        /TEMPLATEINDEX/g,
        unixtime.toString()
      );

      this.templateTarget.insertAdjacentHTML("beforebegin", content);
    }
  }
}
