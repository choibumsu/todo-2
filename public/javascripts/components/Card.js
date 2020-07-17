import { templateToElement } from '../utils/HtmlGenerator'
import EditCardModal from './Modal/EditCardModal'
import '../../stylesheets/components/card.scss'
import { CARD_CLASS, EVENT } from '../utils/Constants'
import DeleteCardModal from './Modal/DeleteCardModal'

export default class Card {
  constructor(emitter, cardId, cardTitle, username, columnIndex) {
    this.$target = ''
    this.emitter = emitter
    this.id = cardId
    this.cardTitle = cardTitle
    this.username = username
    this.columnIndex = columnIndex

    this.init()
  }
}

Card.prototype.init = function () {
  this.setElements()
  this.bindEvent()
}

Card.prototype.setElements = function () {
  const template = `
    <div class='card'>
      <img class='document-icon' src='/static/images/document.svg') />
      <div class='content-container'>
        <div class='content-wrapper'>
          <div class='title'>${this.cardTitle}</div>
          <div class='added-by'>
            <span>Added by </span>
            <span class='strong'>${this.username}</span>
          </div>
        </div>
        <img class='${CARD_CLASS.REMOVE_BTN}' src='/static/images/remove-btn.svg' />
        </div>
    </div>
  `

  this.$target = templateToElement(template)
  this.$removeBtn = this.$target.querySelector(`.${CARD_CLASS.REMOVE_BTN}`)
}

Card.prototype.getTarget = function () {
  return this.$target
}

Card.prototype.bindEvent = function () {
  this.$removeBtn.addEventListener('click', () => {
    this.removeCard()
  })
  // this.$target.addEventListener('dblclick', this.editCard.bind(this))
  this.$target.ondblclick = (event) => {
    event.stopPropagation()
    this.editCard()
  }
}

Card.prototype.editCard = function () {
  const modal = new EditCardModal(
    this.cardTitle,
    function edited(text) {
      this.cardTitle = text
      this.render()
    }.bind(this)
  )
  modal.showModal()
}

Card.prototype.removeCard = function () {
  const modal = new DeleteCardModal(this.cardTitle, function deleted() {
    this.$target.remove()
    this.emitter.emit(EVENT.REMOVE_CARD, this.id)
  }.bind(this))
  modal.showModal()
}

Card.prototype.render = function () {
  this.$target.querySelector('.title').innerText = this.cardTitle
}
