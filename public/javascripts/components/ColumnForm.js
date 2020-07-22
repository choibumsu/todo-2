import { templateToElement } from '../utils/HtmlGenerator'
import { COLUMN_CLASS, COLUMN_FORM_CLASS } from '../utils/Constants'
import '../../stylesheets/components/columnForm.scss'

export default class Card {
  constructor() {
    this.$target = ''

    this.init()
  }

  init() {
    this.setElements()
    this.render()
  }

  setElements() {
    this.template = `
      <div class='column-form'>
        <input type='text' class='${COLUMN_FORM_CLASS.TITLE_INPUT}' placeholder='Enter a column title'>
        <div class='${COLUMN_FORM_CLASS.SUBMIT_BTN}'>Add Column</div>
      </div>
    `

    this.$target = templateToElement(this.template)
  }

  render() {
    const $columnContainer = document.querySelector(
      `.${COLUMN_CLASS.CONTAINER}`
    )
    $columnContainer.appendChild(this.$target)
  }
}
