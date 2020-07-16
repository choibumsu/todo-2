import Modal from './Modal'
import { MODAL_ID, MODAL_CLASS } from '../../utils/Constants'

export default class EditCardModal extends Modal {
  constructor(cardTitle, editCallback) {
    const $modal_box = document.querySelector(
      `#${MODAL_ID.EDIT_MODAL_BOX_CARD}`
    )
    super($modal_box)
    this.$editContent = $modal_box.querySelector(
      `.${MODAL_CLASS.MODAL_CONTENT} > textarea`
    )
    this.$editContent.value = cardTitle
    this.$editBtn = $modal_box.querySelector(`#${MODAL_ID.EDIT_CARD_BTN}`)
    this.bindEvent()
    this.editCallback = editCallback
  }

  bindEvent() {
    this.$editBtn.addEventListener('click', this.editCard.bind(this))
  }

  editCard() {
    this.editCallback(this.$editContent.value)
    this.closeModal()
  }
}
