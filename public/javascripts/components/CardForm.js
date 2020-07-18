import { templateToElement } from '../utils/HtmlGenerator'
import { CLASS_NAME, CARD_FORM_CLASS } from '../utils/Constants'
import '../../stylesheets/components/cardForm.scss'

export default class CardForm {
  constructor() {
    this.$target = ''
    this.$cardTextarea = ''
    this.$addBtn = ''
    this.isActive = false

    this.init()
  }

  init() {
    this.setElements()
    this.bindEvent()
  }

  setElements() {
    const template = `
      <div class='card-form ${CLASS_NAME.DP_NONE}'>
        <textarea class='${CARD_FORM_CLASS.TEXTAREA}' placeholder='Enter a note' maxlength='500'></textarea>
        <div class='button-row'>
          <div class='btn-wrapper'>
            <div class='btn ${CARD_FORM_CLASS.ADD_BTN} ${CLASS_NAME.UNACTIVE}'>Add</div>
          </div>
          <div class='btn-wrapper'>
            <div class='btn ${CARD_FORM_CLASS.CANCEL_BTN}'>Cancel</div>
          </div>
        </div>
      </div>
    `

    this.$target = templateToElement(template)
    this.$cardTextarea = this.$target.querySelector(
      `.${CARD_FORM_CLASS.TEXTAREA}`
    )
    this.$addBtn = this.$target.querySelector(`.${CARD_FORM_CLASS.ADD_BTN}`)
  }

  bindEvent() {
    this.$cardTextarea.addEventListener('input', this.onInputHandler.bind(this))
  }

  getTarget() {
    return this.$target
  }

  onInputHandler(e) {
    const isActive = e.target.value !== ''
    this.setActive(isActive)
  }

  setActive(isActive) {
    this.isActive = isActive

    if (this.isActive) {
      this.$addBtn.classList.remove(CLASS_NAME.UNACTIVE)
      return
    }

    this.$addBtn.classList.add(CLASS_NAME.UNACTIVE)
  }

  toggleCardForm() {
    if (this.$target.classList.contains(CLASS_NAME.DP_NONE)) {
      this.$target.classList.remove(CLASS_NAME.DP_NONE)
      return
    }
    this.$target.classList.add(CLASS_NAME.DP_NONE)
  }

  getCardTitle() {
    if (!this.isActive) {
      return ''
    }

    const cardTitle = this.$cardTextarea.value
    this.$cardTextarea.value = ''
    this.setActive(false)

    return cardTitle
  }
}
