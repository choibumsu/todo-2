import { CLASS_NAME, MODAL_CLASS } from '../../utils/Constants.js'
import '../../../stylesheets/components/modal.scss'

export default class Modal {
  constructor($modalBox) {
    this.$modalBox = $modalBox
    this.$close = $modalBox.querySelector(`#${MODAL_CLASS.CLOSE}`)
    this.$bigbox = $modalBox.querySelector(`.${MODAL_CLASS.BIGBOX}`)
    
    this.bindEventModal()
  }

  bindEventModal() {
    this.$close.onclick=this.closeModal.bind(this)
    this.$bigbox.onclick=this.closeModal.bind(this)
  }

  showModal() {
    this.$modalBox.classList.remove(CLASS_NAME.DP_NONE)
  }

  closeModal() {
    this.$modalBox.classList.add(CLASS_NAME.DP_NONE)
  }
}
