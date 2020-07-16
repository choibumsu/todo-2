import { CLASS_NAME } from '../../utils/Constants.js'
import '../../../stylesheets/components/modal.scss'

export default class Modal {
  constructor($modal) {
    this.$modal = $modal
    this.$close = this.$modal.querySelector('#close')
    this.$bigbox=this.$modal.querySelector('.big-box')
    this.bindEvent()
  }

  bindEvent() {
    this.$close.addEventListener('click', this.close.bind(this))
  }

  show() {
    this.$modal.classList.remove(CLASS_NAME.DP_NONE)
  }
  close() {
    this.$modal.classList.add(CLASS_NAME.DP_NONE)
    this.$bigbox.classList.add(CLASS_NAME.DP_NONE)
  }
}
