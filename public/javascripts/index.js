import { closeModal } from './components/Modal/Modal'
import { toggleSidebar } from './components/SideBar'
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
    title: 'To Do 📝',
    cardDatas: [
      {
        id: 1,
        nextCardId: 0,
        title: '다이어트 하기',
        username: 'choibumsu',
      },
      {
        id: 2,
        nextCardId: 1,
        title: '드래그&드랍 구현하기',
        username: 'gijin',
      },
    ],
  },
  {
    id: 2,
    title: 'In Progess 🏃‍♂️',
    cardDatas: [
      {
        id: 3,
        nextCardId: 0,
        title: 'To Do List 만들기',
        username: 'choibumsu',
      },
      {
        id: 4,
        nextCardId: 3,
        title: '코딩하기',
        username: 'bumsu',
      },
      {
        id: 5,
        nextCardId: 4,
        title: '더블클릭 이벤트 구현하기',
        username: 'gijin',
      },
    ],
  },
  {
    id: 3,
    title: 'Done 👏',
    cardDatas: [
      {
        id: 6,
        nextCardId: 0,
        title: '점심 식사',
        username: 'choibumsu',
      },
    ],
  },
]

tempColumns.forEach((column) => {
  new Column(column)
})
