import { templateToElement } from '../utils/HtmlGenerator'
import { COLUMN_CLASS, COLUMN_FORM_CLASS, CLASS_NAME } from '../utils/Constants'
import '../../stylesheets/components/columnForm.scss'
import Column from './Column'

export default class Card {
  constructor() {
    this.$target = ''

    this.init()
  }

  init() {
    this.setElements()
    this.bindEvent()
    this.render()
  }

  setElements() {
    this.template = `
      <div class='column-form'>
        <input type='text' class='${COLUMN_FORM_CLASS.TITLE_INPUT}' placeholder='Enter a column title'>
        <div class='${COLUMN_FORM_CLASS.SUBMIT_BTN} ${CLASS_NAME.UNACTIVE}'>Add Column</div>
      </div>
    `

    this.$target = templateToElement(this.template)
    this.$titleInput = this.$target.querySelector(
      `.${COLUMN_FORM_CLASS.TITLE_INPUT}`
    )
    this.$submitBtn = this.$target.querySelector(
      `.${COLUMN_FORM_CLASS.SUBMIT_BTN}`
    )
  }

  bindEvent() {
    this.$titleInput.addEventListener(
      'input',
      this.setSubmitBtnActiveHandler.bind(this)
    )
    this.$submitBtn.addEventListener('click', this.addColumnHandler.bind(this))
  }

  render() {
    const $columnContainer = document.querySelector(
      `.${COLUMN_CLASS.CONTAINER}`
    )
    $columnContainer.appendChild(this.$target)
  }

  setSubmitBtnActiveHandler() {
    if (this.$titleInput.value === '') {
      this.$submitBtn.classList.add(CLASS_NAME.UNACTIVE)
      return
    }

    this.$submitBtn.classList.remove(CLASS_NAME.UNACTIVE)
  }

  addColumnHandler() {
    const titleValue = this.$titleInput.value

    if (
      this.$submitBtn.classList.contains(CLASS_NAME.UNACTIVE) ||
      titleValue === ''
    ) {
      return
    }

    // 카드 추가 api 호출 후 id 받기

    const newColumn = new Column({ id: 1, title: titleValue, cardDatas: [] })
    this.$target.parentNode.insertBefore(newColumn.getTarget(), this.$target)

    this.$titleInput.value = ''
    this.setSubmitBtnActiveHandler()
  }
}
