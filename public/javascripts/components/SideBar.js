import { CLASS_NAME } from '../utils/Constants.js'

const menu = document.querySelector('#menu')
const sidebar = document.querySelector('#sidebar')
menu.addEventListener('click', toggleSidebar)

function toggleSidebar() {
  if (sidebar.classList.contains(CLASS_NAME.DP_NONE)) {
    sidebar.classList.remove(CLASS_NAME.DP_NONE)
    return
  }
  sidebar.classList.add(CLASS_NAME.DP_NONE)
}
