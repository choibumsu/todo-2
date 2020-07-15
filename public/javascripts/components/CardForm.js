import { templateToElement } from '../utils/HtmlGenerator'
import '../../stylesheets/components/cardForm.scss'

export default class CardForm {
  constructor() {
    this.$target = ''

    this.init()
  }

  init() {
    this.setTarget()
  }

  setTarget() {
    const template = `
      <div class='card-form'>
        <textarea class='card-textarea' placeholder='Enter a note' maxlength='500'></textarea>
        <div class='button-row'>
          <div class='btn-wrapper'>
            <div class='btn add-btn unactive'>Add</div>
          </div>
          <div class='btn-wrapper'>
            <div class='btn cancel-btn'>Cancel</div>
          </div>
        </div>
      </div>
    `

    this.$target = templateToElement(template)
  }
}
