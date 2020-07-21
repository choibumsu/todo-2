import Column from './components/Column'
import ActivityCard from './components/ActivityCard'
import './components/Header'
import './components/SideBar'
import '../stylesheets/common/base.scss'

import { fetchTest } from './api/index'

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

const tempActivity = [
  {
    content: `<span class='highlight'>@nigayo </span><span>moved the column 하는중.</span>`,
    time: new Date("2020.07.20 10:30:00"),
  },
]

tempColumns.forEach((column) => {
  new Column(column)
})


tempActivity.forEach((card)=>{
  new ActivityCard(card)
})

fetchTest()
