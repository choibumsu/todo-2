import { templateToElement } from '../utils/HtmlGenerator'
import CardForm from './CardForm'
import { COLUMN_CLASS, CARD_CLASS, EVENT } from '../utils/Constants'
import { emitter } from '../utils/EventEmitter'
import '../../stylesheets/components/column.scss'

export default class Column {
  constructor({ columnTitle, cardCount }) {
    this.columnTitle = columnTitle
    this.cardCount = cardCount
    this.$target = ''

    this.init()
  }
}

Column.prototype.init = function () {
  this.setElements()
  this.render()
  this.bindEvent()
}

Column.prototype.setElements = function () {
  const template = `
    <section class='column'>
      <div class='title-bar'>
        <div class='title-wrapper'>
          <div class='card-count'>${this.cardCount}</div>
          <div class='title'>${this.columnTitle}</div> 
        </div>
        <div class='btn-wrapper'>
          <img class='add-btn' src='/static/images/plus-btn.svg' alt='add-btn' />
          <img class='remove-btn' src='/static/images/remove-btn.svg' alt='remove-btn' />
        </div>
      </div>
      <div class='card-form-slot'></div>
      <div class='content-container'></div>
    </section>
  `

  this.$target = templateToElement(template)
  this.$cardCount = this.$target.querySelector(`.${COLUMN_CLASS.CARD_COUNT}`)
}

Column.prototype.render = function () {
  const $columnContainer = document.querySelector(`.${COLUMN_CLASS.CONTAINER}`)
  $columnContainer.appendChild(this.$target)
}

Column.prototype.bindEvent = function () {
  const $cardAddBtn = this.$target.querySelector(`.${COLUMN_CLASS.ADD_BTN}`)
  $cardAddBtn.addEventListener('click', () => {
    this.toggleCardForm()
  })

  emitter.on(EVENT.CHANGE_CARD_COUNT, () => {
    this.setCardCount()
  })
}

Column.prototype.setCardCount = function () {
  const newCardCount = this.$target.querySelectorAll(`.${CARD_CLASS.CARD}`)
    .length
  this.$cardCount.innerHTML = newCardCount
}

Column.prototype.toggleCardForm = function () {
  const $cardFormSlot = this.$target.querySelector(
    `.${COLUMN_CLASS.CARD_FORM_SLOT}`
  )

  if ($cardFormSlot.innerHTML) {
    $cardFormSlot.innerHTML = ''
    return
  }

  const cardForm = new CardForm()
  $cardFormSlot.appendChild(cardForm.$target)
}
