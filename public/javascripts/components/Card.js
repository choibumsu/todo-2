import { templateToElement } from '../utils/HtmlGenerator'
import '../../stylesheets/components/card.scss'
import { CARD_CLASS } from '../utils/Constants'

export default class Card {
  constructor({ id, title, username, nextCardId }) {
    this.$target = ''
    this.id = id
    this.title = title
    this.username = username
    this.nextCardId = nextCardId

    this.init()
  }

  init() {
    this.setElements()
    // this.bindEvent()
  }

  setElements() {
    this.template = `
      <div class='card' data-id='${this.id}'>
        <img class='document-icon' src='/static/images/document.svg') />
        <div class='content-container'>
          <div class='content-wrapper'>
            <div class='${CARD_CLASS.TITLE}'>${this.title}</div>
            <div class='added-by'>
              <span>Added by </span>
              <span class='strong'>${this.username}</span>
            </div>
          </div>
          <img class='${CARD_CLASS.REMOVE_BTN}' src='/static/images/remove-btn.svg' />
          </div>
      </div>
    `

    this.$target = templateToElement(this.template)
    this.$title = this.$target.querySelector(`.${CARD_CLASS.TITLE}`)
  }

  bindEvent() {
    let clicks = 0
    const delay = 400
    this.$target.addEventListener('pointerdown', e2.bind(this))

    function e2(e) {
      clicks++

      setTimeout(function () {
        clicks = 0
      }, delay)

      if (clicks === 2) {
        this.editCard()
        clicks = 0
        return
      } else {
        console.log('pointerdown')
      }
    }
  }

  removeTarget() {
    this.$target.remove()
  }

  getTarget() {
    return this.$target
  }

  getId() {
    return this.id
  }

  getTitle() {
    return this.title
  }

  setTitle(editedTitle) {
    this.title = editedTitle
    this.$title.innerText = this.title
  }

  setNextCardId(nextCardId) {
    this.nextCardId = nextCardId
  }
}
