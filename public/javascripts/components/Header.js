import '../../stylesheets/components/header.scss'

import { CLASS_NAME, HEADER_CLASS, SIDEBAR_CLASS } from '../utils/Constants'
import { templateToElement } from '../utils/HtmlGenerator'

export default class Header {
  constructor({ name }) {
    this.$target = ''
    this.username = name

    this.init()
  }

  async init() {
    this.setElements()
    this.render()
    this.bindEvent()
  }

  setElements() {
    const template = `
      <header id='page-header'>
        <div class='left-side'>
          <div class='title'>TODO List</div>
          <div class='username-wrapper'>
            <div class='${HEADER_CLASS.USERNAME}'>${this.username}</div>
            <div>님</div>
          </div>
        </div>
        <div class='right-side'>
          <div class='${HEADER_CLASS.LOGOUT_BTN}'>LOGOUT</div>
          <div class='${HEADER_CLASS.MENU}'>MENU</div>
        </div>
      </header>
    `

    this.$target = templateToElement(template)
    this.$menuBtn = this.$target.querySelector(`.${HEADER_CLASS.MENU}`)
  }

  render() {
    document.body.appendChild(this.$target)
  }

  bindEvent() {
    this.$menuBtn.addEventListener('click', this.toggleMenu)
  }

  toggleMenu() {
    const $sidebar = document.querySelector(`.${SIDEBAR_CLASS.SIDEBAR}`)

    if ($sidebar.classList.contains(CLASS_NAME.DP_NONE)) {
      $sidebar.classList.remove(CLASS_NAME.DP_NONE)
      return
    }
    $sidebar.classList.add(CLASS_NAME.DP_NONE)
  }
}
