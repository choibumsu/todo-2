const menu = document.querySelector('#menu')
const sidebar = document.querySelector('#sidebar')
menu.addEventListener('click', toggleSidebar)

function toggleSidebar() {
    if (sidebar.style.display == 'none') {
        sidebar.style.display = 'flex'
        return;
    }
    sidebar.style.display = 'none'
}