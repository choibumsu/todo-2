import { closeModal } from './components/Modal/Modal'
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
    columnTitle: 'To Do 📝',
    cardDatas: [
      {
        id: 1,
        columnIndex: 1,
        cardTitle: '다이어트 하기',
        username: 'choibumsu',
      },
      {
        id: 2,
        columnIndex: 2,
        cardTitle: '드래그&드랍 구현하기',
        username: 'gijin',
      },
    ],
  },
  {
    id: 2,
    columnTitle: 'In Progess 🏃‍♂️',
    cardDatas: [
      {
        id: 3,
        columnIndex: 1,
        cardTitle: 'To Do List 만들기',
        username: 'choibumsu',
      },
      {
        id: 4,
        columnIndex: 2,
        cardTitle: '코딩하기',
        username: 'bumsu',
      },
      {
        id: 5,
        columnIndex: 3,
        cardTitle: '더블클릭 이벤트 구현하기',
        username: 'gijin',
      },
    ],
  },
  {
    id: 3,
    columnTitle: 'Done 👏',
    cardDatas: [
      {
        id: 6,
        columnIndex: 1,
        cardTitle: '점심 식사',
        username: 'choibumsu',
      },
    ],
  },
]

tempColumns.forEach((column) => {
  new Column(column)
})
