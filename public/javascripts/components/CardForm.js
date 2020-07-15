import { templateToElement } from '../utils/HtmlGenerator'
import { CLASS_NAME } from '../utils/Constants'
import '../../stylesheets/components/cardForm.scss'

export default class CardForm {
  constructor() {
    this.$target = ''
    this.$cardTextarea = ''

    this.init()
  }

  init() {
    this.setElements()
    this.bindEvent()
  }

  setElements() {
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
    this.$cardTextarea = this.$target.querySelector('textarea.card-textarea')
    this.$addBtn = this.$target.querySelector('.add-btn')
  }

  bindEvent() {
    this.$cardTextarea.addEventListener('input', (e) => {
      this.setActiveAddbtn(e)
    })
  }

  setActiveAddbtn(e) {
    if (e.target.value) {
      this.$addBtn.classList.remove(CLASS_NAME.UNACTIVE)
      return
    }

    this.$addBtn.classList.add(CLASS_NAME.UNACTIVE)
  }
}
