import Card from './Card'
import { templateToElement } from '../utils/HtmlGenerator'
import {
  CLASS_NAME,
  CARD_FORM_CLASS,
  COLUMN_CLASS,
  EVENT,
} from '../utils/Constants'
import { emitter } from '../utils/EventEmitter'
import '../../stylesheets/components/cardForm.scss'

export default class CardForm {
  constructor() {
    this.$target = ''
    this.$cardTextarea = ''
    this.$addBtn = ''
    this.$cancelBtn = ''
    this.isActive = false

    this.init()
  }
}

CardForm.prototype.init = function () {
  this.setElements()
  this.bindEvent()
}

CardForm.prototype.setElements = function () {
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
  this.$cancelBtn = this.$target.querySelector(`.${CARD_FORM_CLASS.CANCEL_BTN}`)
}

CardForm.prototype.bindEvent = function () {
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

CardForm.prototype.setActive = function (isActive) {
  this.isActive = isActive

  if (this.isActive) {
    this.$addBtn.classList.remove(CLASS_NAME.UNACTIVE)
    return
  }

  this.$addBtn.classList.add(CLASS_NAME.UNACTIVE)
}

CardForm.prototype.removeCardForm = function () {
  this.$target.remove()
}

CardForm.prototype.addCard = function () {
  if (!this.isActive) {
    return
  }

  const $parentColumn = this.$target.closest('.column')
  const $contentContainer = $parentColumn.querySelector(
    `.${COLUMN_CLASS.CONTENT_CONTAINER}`
  )
  const $newCard = new Card(this.$cardTextarea.value).getTarget()
  $contentContainer.prepend($newCard)
  emitter.emit(EVENT.CHANGE_CARD_COUNT)

  this.$cardTextarea.value = ''
  this.setActive(false)
}
