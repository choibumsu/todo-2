import Column from './components/Column'
import ActivityCard from './components/ActivityCard'
import './components/Header'
import './components/SideBar'
import '../stylesheets/common/base.scss'

import { fetchColumn, fetchCard, fetchActivityCard } from './api/index'

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

async function getActivityCard() {
  try {
    const allCardActivitys = await fetchActivityCard()

    allCardActivitys.forEach((cardActivity) => {
      if (cardActivity.category == 'card') {
        new ActivityCard(cardActivity)
      }
    })
  } catch (e) {
    console.log(e)
  }
}

getColumn()
getActivityCard()
