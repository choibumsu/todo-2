import { closeModal } from './components/Modal'
import { toggleSidebar } from './components/SideBar'
import './components/Card'
import './components/CardForm'
import Column from './components/Column'
import './components/DeleteCardModal'
import './components/EditCardModal'
import './components/EditColumnModal'
import './components/Header'
import './components/LoginForm'
import './components/SideBarCard'
import '../stylesheets/common/base.scss'

const tempColumns = [
  {
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
    columnTitle: 'In Progess~',
    cardList: [],
  },
  {
    columnTitle: 'Done!!!',
    cardList: [],
  },
]

tempColumns.forEach((column) => {
  new Column(column)
})
