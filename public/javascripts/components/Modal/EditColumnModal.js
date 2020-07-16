import Modal from './Modal'
import { MODAL_ID } from '../../utils/Constants'

export default class EditColumnModal extends Modal {
  constructor() {
    let $modal_box = document.querySelector(
      `#${MODAL_ID.EDIT_MODAL_BOX_COLUMN}`
    )
    super($modal_box)
  }
}
