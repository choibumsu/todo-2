import { CLASS_NAME } from '../utils/Constants.js'

const modal = document.querySelector('#modal')
const bigBox=document.querySelector('.big-box')
const close = document.querySelector('#close')
close.addEventListener('click', closeModal)

function closeModal() {
  modal.classList.add(CLASS_NAME.DP_NONE)
  bigBox.classList.add(CLASS_NAME.DP_NONE)
}
