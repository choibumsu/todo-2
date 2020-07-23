import {
  CLASS_NAME,
  BOARD_CLASS,
  COLUMN_FORM_CLASS,
  COLUMN_CLASS,
} from '../utils/Constants'
import { templateToElement } from '../utils/HtmlGenerator'
import '../../stylesheets/components/board.scss'

import Column from './Column'
import ColumnForm from './ColumnForm'
import { fetchColumn, fetchCard, createColumnApi } from '../api/index'

export default class Board {
  constructor() {
    this.$target = ''
    this.columnList = []
    this.columnForm = new ColumnForm()

    this.init()
  }

  async init() {
    this.setElements()
    await this.setColumnList()
    this.setColumnForm()
    this.render()
    this.bindEvent()
  }

  setElements() {
    const template = `
      <div class='${BOARD_CLASS.BOARD}'>
      </div>
    `

    this.$target = templateToElement(template)
  }

  async setColumnList() {
    const formattedColumns = await this.formatColumns()
    await this.formatCards(formattedColumns)
  }

  async formatColumns() {
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

    return formattedColumns
  }

  async formatCards(formattedColumns) {
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
      this.$target.appendChild(column.getTarget())

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

  bindEvent() {
    this.$target.addEventListener('click', this.onClickHandler.bind(this))
  }

  onClickHandler(e) {
    if (e.target.classList.contains(COLUMN_FORM_CLASS.SUBMIT_BTN)) {
      this.addColumn()
      return
    }

    if (e.target.classList.contains(COLUMN_CLASS.REMOVE_BTN)) {
      this.removeColumn(e)
    }
  }

  async addColumn() {
    const titleValue = this.columnForm.getTitleValue()
    const isActive = this.columnForm.getIsActive()
    const nextColumnId = this.getNewNextColumnId()

    if (isActive && titleValue === '') {
      return
    }

    const [data, status] = await createColumnApi({
      title: titleValue,
      nextColumnId,
    })

    if (status === 200) {
      const newColumn = new Column({
        id: data.id,
        title: titleValue,
        cardDatas: [],
      })

      this.$target.insertBefore(
        newColumn.getTarget(),
        this.columnForm.getTarget()
      )

      this.columnForm.setDefault()

      return
    } else if (status === 401) {
      alert('컬럼 추가 권한이 없습니다.')
      return
    }

    // unexcepted error
    alert('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.')
  }

  getNewNextColumnId() {
    const lastColumn = this.columnForm.getTarget().previousElementSibling
    if (lastColumn) return lastColumn.dataset.id

    return null
  }

  removeColumn(e) {
    const removedColumnId = +e.target.closest(`.${COLUMN_CLASS.COLUMN}`).dataset
      .id
    const removedColumn = this.columnList.find(
      (column) => column.id === removedColumnId
    )

    removedColumn.removeTarget()
  }
}
