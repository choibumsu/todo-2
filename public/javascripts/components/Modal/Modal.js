import { CLASS_NAME } from '../../utils/Constants.js'
import '../../../stylesheets/components/modal.scss'

export default class Modal {
  constructor($modal_box) {
    this.$modal = $modal_box.querySelector('.modal')
    this.$close = $modal_box.querySelector('#close')
    this.$bigbox = $modal_box.querySelector('.big-box')
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
