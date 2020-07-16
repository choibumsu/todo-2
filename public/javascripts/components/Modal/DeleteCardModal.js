import Modal from './Modal'

export default class DeleteCardModal extends Modal{
  constructor(){
    let $modal_box=document.querySelector('#deleteCard')
    super($modal_box)
  }
}