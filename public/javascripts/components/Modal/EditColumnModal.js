import Modal from './Modal'
import { MODAL_CLASS,MODAL_ID } from '../../utils/Constants'

export default class EditColumnModal extends Modal {
  constructor(columnTitle,editCallback) {
    const $modal_box = document.querySelector(
      `#${MODAL_ID.EDIT_MODAL_BOX_COLUMN}`
    )
    super($modal_box)
    this.$editContent=$modal_box.querySelector(`.${MODAL_CLASS.MODAL_CONTENT} > input`)
    this.$editContent.value=columnTitle
    this.$editBtn=$modal_box.querySelector(`#${MODAL_ID.EDIT_COLUMN_BTN}`)
    this.bindEvent()
    this.editCallback=editCallback
  }
  bindEvent(){
    this.$editBtn.addEventListener('click',this.editColumn.bind(this))
  }
  editColumn(){
    this.editCallback(this.$editContent.value)
    this.closeModal()
  }
}
