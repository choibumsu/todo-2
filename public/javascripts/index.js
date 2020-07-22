import Column from './components/Column'
import ColumnForm from './components/ColumnForm'
import ActivityCard from './components/ActivityCard'
import './components/Header'
import './components/SideBar'
import '../stylesheets/common/base.scss'

import { fetchColumn, fetchCard, fetchActivityCard } from './api/index'

async function getColumn() {
  let allColumns = await fetchColumn()
  let allCards = await fetchCard()

  const formattedColumns = allColumns.reduce((formattedColumns, column) => {
    if (column.next_column_id === null) {
      column.next_column_id = 0
    }
    formattedColumns[column.next_column_id] = {
      id: column.id,
      title: column.title,
    }

    return formattedColumns
  }, {})
  console.log(formattedColumns)

  let [column, nextColumnId] = [formattedColumns[0], 0]
  while (column !== undefined) {
    ;[column.cardDatas, allCards] = allCards.reduce(
      ([cardDatas, newAllCards], card) => {
        if (card.next_card_id === null) {
          card.next_card_id = 0
        }

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

    nextColumnId = column.id
    column = formattedColumns[nextColumnId]
  }

  new ColumnForm()
}

async function getActivityCard() {
  try {
    const allCardActivitys = await fetchActivityCard()

    allCardActivitys.forEach((cardActivity) => {
      new ActivityCard(cardActivity)
    })
  } catch (e) {
    console.log(e)
  }
}

getColumn()
getActivityCard()
