import { templateToElement } from '../utils/HtmlGenerator'
import EditCardModal from './Modal/EditCardModal'
import '../../stylesheets/components/card.scss'
import { CARD_CLASS, EVENT } from '../utils/Constants'

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
  this.$target.addEventListener('dblclick', this.editCard.bind(this))
}

Card.prototype.editCard = function () {
  const card = new EditCardModal(this.cardTitle, (edited) => {
    this.cardTitle = edited
    this.render()
  })
  card.showModal()
}

Card.prototype.removeCard = function () {
  const isRemove = confirm('정말 삭제하시겠습니까?')

  if (!isRemove) return

  this.$target.remove()
  this.emitter.emit(EVENT.REMOVE_CARD, this.id)
}

Card.prototype.render = function () {
  this.$target.querySelector('.title').innerText = this.cardTitle
}
