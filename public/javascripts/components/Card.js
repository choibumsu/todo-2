import { templateToElement } from '../utils/HtmlGenerator'
import '../../stylesheets/components/card.scss'
import { CARD_CLASS, CLASS_NAME } from '../utils/Constants'

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

  removeTarget() {
    this.$target.remove()
  }

  moveStart(e) {
    this.copyTarget(e)
    window.addEventListener('pointermove', this.moveCopy.bind(this))
    window.addEventListener('pointerup', this.moveStop.bind(this))
  }

  copyTarget(e) {
    this.$copyTarget = this.$target.cloneNode(true)
    this.$copyTarget.style.width = `${this.$target.offsetWidth}px`
    this.$copyTarget.style.position = 'absolute'
    this.$copyTarget.style.top = `${this.$target.offsetTop}px`
    this.$copyTarget.style.left = `${this.$target.offsetLeft}px`
    this.offsetDiff = {
      top: e.pageY - this.$target.offsetTop,
      left: e.pageX - this.$target.offsetLeft,
    }

    this.$target.classList.add(CARD_CLASS.MOVING)
    document.body.appendChild(this.$copyTarget)
  }

  moveCopy(e) {
    this.$copyTarget.style.top = `${e.pageY - this.offsetDiff.top}px`
    this.$copyTarget.style.left = `${e.pageX - this.offsetDiff.left}px`
  }

  moveStop(e) {
    this.$copyTarget.remove()
    this.$target.classList.remove(CARD_CLASS.MOVING)
    document.body.classList.remove(CLASS_NAME.US_NONE)
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
