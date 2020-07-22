import { CLASS_NAME, BOARD_CLASS } from '../utils/Constants'
import { templateToElement } from '../utils/HtmlGenerator'
import '../../stylesheets/components/board.scss'

import Column from './Column'
import ColumnForm from './ColumnForm'
import { fetchColumn, fetchCard } from '../api/index'

export default class Board {
  constructor() {
    this.$target = ''
    this.columnList = []
    this.columnForm = new ColumnForm()

    this.init()
  }

  init() {
    this.setElements()
    this.setColumnList()
    this.setColumnForm()
    this.render()
  }

  setElements() {
    const template = `
      <div class='${BOARD_CLASS.BOARD}'>
      </div>
    `

    this.$target = templateToElement(template)
  }

  async setColumnList() {
    const formattedColumns = this.formatColumns()
    this.formatCards(formattedColumns)
  }

  formatColumns() {
    let allColumns = await fetchColumn()

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

    return formattedColumns;
  }

  formatCards(formattedColumns) {
    let allCards = await fetchCard()
    let [columnData, nextColumnId] = [formattedColumns[0], 0]

    while (columnData !== undefined) {
      ;[columnData.cardDatas, allCards] = allCards.reduce(
        ([cardDatas, newAllCards], card) => {
          if (card.next_card_id === null) {
            card.next_card_id = 0
          }

          if (card.column_id === columnData.id) {
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

      const column = new Column(columnData)
      this.columnList.push(column)
      this.$target.prepend(column.getTarget())

      nextColumnId = columnData.id
      columnData = formattedColumns[nextColumnId]
    }
  }

  setColumnForm() {
    this.$target.appendChild(this.columnForm.getTarget())
  }

  render() {
    document.body.appendChild(this.$target)
  }
}
