import { CLASS_NAME, MODAL_CLASS } from '../../utils/Constants.js'
import '../../../stylesheets/components/modal.scss'

export default class Modal {
  constructor($modal_box) {
    this.$modal_box = $modal_box
    this.$close = $modal_box.querySelector(`#${MODAL_CLASS.CLOSE}`)
    this.$bigbox = $modal_box.querySelector(`.${MODAL_CLASS.BIGBOX}`)
    this.$editContent = $modal_box.querySelector(
      `.${MODAL_CLASS.MODAL_CONTENT} > textarea`
    )
    this.bindEvent()
  }

  bindEvent() {
    this.$close.addEventListener('click', this.closeModal.bind(this))
    this.$bigbox.addEventListener('click', this.closeModal.bind(this))
  }

  showModal(cardTitle) {
    this.$modal_box.classList.remove(CLASS_NAME.DP_NONE)
    this.$editContent.value=cardTitle
  }
  closeModal() {
    this.$modal_box.classList.add(CLASS_NAME.DP_NONE)
  }
}
