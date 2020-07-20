import Column from './components/Column'
import './components/Header'
import './components/SideBar'
import '../stylesheets/common/base.scss'

import { fetchColumn, fetchCard } from './api/index'

async function getColumn() {
  try {
    let allColumn = await fetchColumn()
    let allCard = await fetchCard()
  } catch (e) {
    console.log(e)
  }

  allColumn.forEach((column) => {
    column.cardDatas = []
    allCard.forEach((card) => {
      if (card.column_id == column.id) {
        column.cardDatas.push(card)
      }
    })
    new Column(column)
  })
}

getColumn()
