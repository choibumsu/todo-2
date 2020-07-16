import Modal from './Modal'

export default class DeleteCardModal extends Modal{
  constructor(){
    let modal=document.querySelector('#deleteCard')
    super(modal)
  }
}