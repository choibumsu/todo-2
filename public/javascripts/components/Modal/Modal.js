import { CLASS_NAME, MODAL_CLASS } from '../../utils/Constants.js'
import '../../../stylesheets/components/modal.scss'

export default class Modal {
  constructor($modal_box) {
    this.$modal = $modal_box.querySelector(`.${MODAL_CLASS.MODAL}`)
    this.$close = $modal_box.querySelector(`#${MODAL_CLASS.CLOSE}`)
    this.$bigbox = $modal_box.querySelector(`.${MODAL_CLASS.BIGBOX}`)

    this.bindEvent()
  }

  bindEvent() {
    this.$close.addEventListener('click', this.closeModal.bind(this))
    this.$bigbox.addEventListener('click', this.closeModal.bind(this))
  }

  showModal() {
    this.$modal.classList.remove(CLASS_NAME.DP_NONE)
  }
  closeModal() {
    this.$modal.classList.add(CLASS_NAME.DP_NONE)
    this.$bigbox.classList.add(CLASS_NAME.DP_NONE)
  }
}