import Column from './components/Column'
import ActivityCard from './components/ActivityCard'
import './components/Header'
import './components/SideBar'
import '../stylesheets/common/base.scss'

import { fetchColumn, fetchCard } from './api/index'

async function getColumn() {
  try {
    const allColumns = await fetchColumn()
    const allCards = await fetchCard()

    allColumns.forEach((column) => {
      column.cardDatas = []
      allCards.forEach((card) => {
        if (card.column_id == column.id) {
          column.cardDatas.push({
            id: card.id,
            nextCardId: card.next_card_id,
            title: card.title,
            username: card.name,
          })
        }
      })
      new Column(column)
    })
  } catch (e) {
    console.log(e)
  }
}

getColumn()

const tempActivity = [
  {
    content: `<span class='highlight'>@nigayo </span><span>moved the column 오늘임.</span>`,
    time: new Date('2020.07.21 17:46:00'),
  },
  {
    content: `<span class='highlight'>@nigayo </span><span>moved the column 어제임.</span>`,
    time: new Date('2020.07.20 10:30:00'),
  },
  {
    content: `<span class='highlight'>@nigayo </span><span>moved the column 오래됨.</span>`,
    time: new Date('2020.07.19 10:30:00'),
  },
  {
    content: `<span class='highlight'>@nigayo </span><span>moved the column 젤오래됨.</span>`,
    time: new Date('2020.07.18 10:30:00'),
  },
]

tempActivity.forEach((card) => {
  new ActivityCard(card)
})
