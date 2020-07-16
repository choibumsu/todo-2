import Modal from './Modal'

export default class EditColumnModal extends Modal{
  constructor(){
    let $modal_box=document.querySelector('#editColumn')
    super($modal_box)
  }
}