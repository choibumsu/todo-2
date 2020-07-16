import Modal from './Modal'
import { MODAL_ID } from '../../utils/Constants'

export default class DeleteCardModal extends Modal {
  constructor() {
    let $modal_box = document.querySelector(
      `#${MODAL_ID.DELETE_MODAL_BOX_CARD}`
    )
    super($modal_box)
  }
}
