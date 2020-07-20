import { templateToElement } from '../utils/HtmlGenerator'
import '../../stylesheets/components/sidebar.scss'
import { SIDEBAR_CLASS, SIDEBAR_ID } from '../utils/Constants'

export default class ActivityCard {
  constructor({ content, time }) {
    this.$target = ''
    this.content = content
    this.time = time
    this.$activityColumn = ''
    this.init()
  }

  init() {
    this.setElements()
  }

  setElements() {
    const template = `
      <div id="activity__card">
        <div class="content">${this.content}</div>
        <div class="time">${this.timeForamt()}</div>
      </div>
    `
    this.$activityColumn = document.querySelector(
      `#${SIDEBAR_ID.ACTIVITY_COLUMN}`
    )
    this.$target = templateToElement(template)
    this.$activityColumn.prepend(this.$target)
  }

  timeForamt() {
    let timeString = ``

    let oldSecond = this.time.getTime() / 1000
    let currentSecond = new Date().getTime() / 1000
    let timediff = currentSecond - oldSecond
    timeString = `${timediff.toFixed(0)} seconds ago`
    return timeString
  }
}
