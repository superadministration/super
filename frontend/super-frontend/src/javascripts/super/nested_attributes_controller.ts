import { Controller } from 'stimulus'
import $ from 'jquery'

export default class extends Controller {
  templateTarget: Element | undefined

  static targets = ['template']

  add(event: Event) {
    event.preventDefault()

    if (this.templateTarget) {
      const unixtime = (new Date()).getTime();
      let $content = $(this.templateTarget.innerHTML.replace(/TEMPLATE/g, unixtime.toString()))
      var $templateTarget = $(this.templateTarget)

      $templateTarget.before($content)
    }
  }

  toggleDestruction(event: Event) {
    if (event.target) {
      let $eventTarget = $(event.target)
      let $fieldset = $eventTarget.closest("fieldset")

      if ($eventTarget.is(":checked")) {
        $fieldset.addClass('opacity-75 bg-gray-100')
      } else {
        $fieldset.removeClass('opacity-75 bg-gray-100')
      }
    }
  }
}
