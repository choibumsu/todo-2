import '../../stylesheets/components/header.scss'

import { CLASS_NAME, LOGIN_FORM_CLASS } from '../utils/Constants'
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
            <div class='username'>${this.username}</div>
            <div>님</div>
          </div>
        </div>
        <div class='right-side'>
          <div class='logout-btn'>LOGOUT</div>
          <div class='menu'>MENU</div>
        </div>
      </header>
    `

    this.$target = templateToElement(template)
  }

  render() {
    document.body.appendChild(this.$target)
  }

  bindEvent() {}
}
