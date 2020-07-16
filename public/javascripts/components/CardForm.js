import { templateToElement } from '../utils/HtmlGenerator'
import { CLASS_NAME, CARD_FORM_CLASS, COLUMN_CLASS } from '../utils/Constants'
import '../../stylesheets/components/cardForm.scss'
import Card from './Card'

export default class CardForm {
  constructor() {
    this.$target = ''
    this.$cardTextarea = ''
    this.$addBtn = ''
    this.$cancelBtn = ''
    this.isActive = false

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
    this.$cardTextarea = this.$target.querySelector(
      `.${CARD_FORM_CLASS.TEXTAREA}`
    )
    this.$addBtn = this.$target.querySelector(`.${CARD_FORM_CLASS.ADD_BTN}`)
    this.$cancelBtn = this.$target.querySelector(
      `.${CARD_FORM_CLASS.CANCEL_BTN}`
    )
  }

  bindEvent() {
    this.$cardTextarea.addEventListener('input', (e) => {
      this.setActive(e.target.value)
    })

    this.$cancelBtn.addEventListener('click', (e) => {
      this.removeCardForm()
    })

    this.$addBtn.addEventListener('click', (e) => {
      this.addCard()
    })
  }

  setActive(isActive) {
    this.isActive = isActive

    if (this.isActive) {
      this.$addBtn.classList.remove(CLASS_NAME.UNACTIVE)
      return
    }

    this.$addBtn.classList.add(CLASS_NAME.UNACTIVE)
  }

  removeCardForm() {
    this.$target.remove()
  }

  addCard() {
    if (!this.isActive) {
      return
    }

    const $parentColumn = this.$target.closest('.column')
    const $contentContainer = $parentColumn.querySelector(
      `.${COLUMN_CLASS.CONTENT_CONTAINER}`
    )
    const $newCard = new Card(this.$cardTextarea.value).getTarget()
    $contentContainer.appendChild($newCard)

    this.$cardTextarea.value = ''
    this.setActive(false)
  }
}
