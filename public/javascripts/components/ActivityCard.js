import { templateToElement } from '../utils/HtmlGenerator'
import '../../stylesheets/components/sidebar.scss'
import { TIME, SIDEBAR_ID } from '../utils/Constants'

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
    const oldSecond = this.time.getTime() / 1000
    const currentSecond = new Date().getTime() / 1000
    let timediff = parseInt((currentSecond - oldSecond).toFixed(0))
    var timeString = ''
    if (timediff < TIME.SECOND) {
      timeString = `${timediff} seconds ago`
    } else if (timediff < TIME.MINUTE_TO_SECOND) {
      timediff = (timediff / TIME.SECOND).toFixed(0)
      timeString = `${timediff} minutes ago`
    } else if (timediff < TIME.HOUR_TO_SECOND) {
      timediff = (timediff / TIME.MINUTE_TO_SECOND).toFixed(0)
      timeString = `${timediff} hours ago`
    } else {
      timediff = (timediff / TIME.HOUR_TO_SECOND).toFixed(0)
      if (timediff == '1') timeString = `${timediff} day ago`
      else timeString = `${timediff} days ago`
    }
    return timeString
  }
}
