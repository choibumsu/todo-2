import { CLASS_NAME } from '../utils/Constants'
import { templateToElement } from '../utils/HtmlGenerator'
import '../../stylesheets/components/loginForm.scss'

import Board from './Board'
import ActivityCard from './ActivityCard'
import { fetchActivityCard, checkAuthApi } from '../api/index'

export default class LoginForm {
  constructor() {
    this.$target = ''

    this.init()
  }

  async init() {
    const isAuth = await this.checkAuth()

    if (!isAuth) {
      this.setElements()
      this.render()
      this.bindEvent()
    }
  }

  async checkAuth() {
    const [data, status] = await checkAuthApi()

    if (data) {
      new Board(data)
      this.getActivityCard()

      return true
    } else if (status === 404) {
      return false
    }

    alert('에러가 발생하였습니다.')
    return false
  }

  async getActivityCard() {
    try {
      const allCardActivitys = await fetchActivityCard()

      allCardActivitys.forEach((cardActivity) => {
        new ActivityCard(cardActivity)
      })
    } catch (e) {
      console.log(e)
    }
  }

  setElements() {
    const template = `
      <div id='login-page'>
        <div class='login-container'>
          <div class='title'>Welcome</div>
          <input type='text' placeholder='Username' />
          <div class='login-btn ${CLASS_NAME.UNACTIVE}'>Login</div>
        </div>
      </div>
    `

    this.$target = templateToElement(template)
  }

  render() {
    document.body.appendChild(this.$target)
  }

  bindEvent() {}
}
