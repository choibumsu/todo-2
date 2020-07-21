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
            nextCardId: card.nextcard_id,
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
    content: `<span class='highlight'>@nigayo </span><span>moved the column 하는중.</span>`,
    time: new Date("2020.07.20 10:30:00"),
  },
]

tempActivity.forEach((card)=>{
  new ActivityCard(card)
})
