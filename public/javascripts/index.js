import Column from './components/Column'
import ActivityCard from './components/ActivityCard'
import './components/Header'
import './components/SideBar'
import '../stylesheets/common/base.scss'

import { fetchColumn, fetchCard } from './api/index'

async function getColumn() {
  const allColumns = await fetchColumn()
  let allCards = await fetchCard()

  allColumns.forEach((column) => {
    ;[column.cardDatas, allCards] = allCards.reduce(
      ([cardDatas, newAllCards], card) => {
        if (card.column_id === column.id) {
          cardDatas[card.next_card_id] = {
            id: card.id,
            title: card.title,
            username: card.name,
          }
        } else {
          newAllCards.push(card)
        }

        return [cardDatas, newAllCards]
      },
      [{}, []]
    )

    new Column(column)
  })
}

getColumn()

const tempActivity = [
  {
    content: `<span class='highlight'>@nigayo </span><span>moved the column 하는중.</span>`,
    time: new Date('2020.07.20 10:30:00'),
  },
]

tempActivity.forEach((card) => {
  new ActivityCard(card)
})
