import { CLASS_NAME, MODAL_CLASS } from '../../utils/Constants.js'
import '../../../stylesheets/components/modal.scss'

export default class Modal {
  constructor($modal_box) {
    this.$modal_box = $modal_box
    this.$close = $modal_box.querySelector(`#${MODAL_CLASS.CLOSE}`)
    this.$bigbox = $modal_box.querySelector(`.${MODAL_CLASS.BIGBOX}`)
    
    this.bindEventModal()
  }

  bindEventModal() {
    this.$close.onclick=this.closeModal.bind(this)
    this.$bigbox.onclick=this.closeModal.bind(this)
  }

  showModal() {
    this.$modal_box.classList.remove(CLASS_NAME.DP_NONE)
  }

  closeModal() {
    this.$modal_box.classList.add(CLASS_NAME.DP_NONE)
  }
}
