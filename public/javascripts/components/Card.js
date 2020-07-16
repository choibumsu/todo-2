import { templateToElement } from '../utils/HtmlGenerator'
import '../../stylesheets/components/card.scss'

export default class Card {
  constructor(cardTitle) {
    this.cardTitle = cardTitle
    this.user = 'choibumsu'
    this.$target = ''

    this.init()
  }

  init() {
    this.setElements()
    this.bindEvent()
  }

  setElements() {
    const template = `
      <div class='card'>
        <img class='document-icon' src='/static/images/document.svg') />
        <div class='content-container'>
          <div class='content-wrapper'>
            <div class='title'>${this.cardTitle}</div>
            <div class='added-by'>
              <span>Added by </span>
              <span class='strong'>${this.user}</span>
            </div>
          </div>
          <img class='remove-icon' src='/static/images/remove-btn.svg' />
          </div>
      </div>
    `

    this.$target = templateToElement(template)
  }

  getTarget() {
    return this.$target
  }

  bindEvent() {}
}
