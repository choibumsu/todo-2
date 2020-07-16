import Modal from './Modal'

export default class EditCardModal extends Modal {
  constructor() {
    let $modal_box=document.querySelector('#editCard')
    super($modal_box)
  }
}
