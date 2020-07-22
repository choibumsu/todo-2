import { templateToElement } from '../utils/HtmlGenerator'
import { COLUMN_CLASS, COLUMN_FORM_CLASS, CLASS_NAME } from '../utils/Constants'
import '../../stylesheets/components/columnForm.scss'
import Column from './Column'
import { createColumnApi } from '../api/index'

export default class ColumnForm {
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

  async addColumnHandler() {
    const titleValue = this.$titleInput.value

    if (
      this.$submitBtn.classList.contains(CLASS_NAME.UNACTIVE) ||
      titleValue === ''
    ) {
      return
    }

    const [data, status] = await createColumnApi({
      title: titleValue,
    })

    if (status === 200) {
      const newColumn = new Column({
        id: data.id,
        title: titleValue,
        cardDatas: [],
      })
      this.$target.parentNode.insertBefore(newColumn.getTarget(), this.$target)

      this.$titleInput.value = ''
      this.setSubmitBtnActiveHandler()

      return
    } else if (status === 401) {
      alert('컬럼 추가 권한이 없습니다.')
      return
    }

    // unexcepted error
    alert('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.')
  }
}
