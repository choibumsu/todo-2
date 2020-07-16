// import { closeModal } from './components/Modal'
import { toggleSidebar } from './components/SideBar'
import './components/Card'
import './components/CardForm'
import Column from './components/Column'
import DeleteCardModal from './components/Modal/DeleteCardModal'
import EditCardModal from './components/Modal/EditCardModal'
import EditColumnModal from './components/Modal/EditColumnModal'
import './components/Header'
import './components/LoginForm'
import './components/SideBarCard'
import '../stylesheets/common/base.scss'
const tempColumns = [
  {
    id: 1,
    columnTitle: 'To Doooooo!',
    cardDatas: [
      {
        id: 2,
        columnIndex: 1,
        cardTitle: 'Hello',
        username: 'choibumsu',
      },
      {
        id: 1,
        columnIndex: 2,
        cardTitle: 'hihi!!',
        username: 'bumsu',
      },
    ],
  },
  {
    id: 2,
    columnTitle: 'In Progess~',
    cardDatas: [],
  },
  {
    id: 3,
    columnTitle: 'Done!!!',
    cardDatas: [],
  },
]

tempColumns.forEach((column) => {
  new Column(column)
})

new EditCardModal()
new DeleteCardModal()
new EditColumnModal()
