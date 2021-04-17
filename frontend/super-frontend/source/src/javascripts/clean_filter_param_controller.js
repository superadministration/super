import { Controller } from "stimulus";

export default class extends Controller {
  static get targets() {
    return ["candidate", "control"];
  }

  call() {
    let allControlsBlank = this.controlTargets.every(function(el) {
      return el.value === "";
    });

    if (!allControlsBlank) {
      return;
    }

    this.candidateTargets.forEach(function(el) {
      el.disabled = true;
    });
  }
}
