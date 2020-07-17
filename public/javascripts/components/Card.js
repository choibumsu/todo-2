import { templateToElement } from '../utils/HtmlGenerator'
import EditCardModal from './Modal/EditCardModal'
import '../../stylesheets/components/card.scss'
import DeleteCardModal from './Modal/DeleteCardModal'
import { CARD_CLASS, EVENT, CLASS_NAME, COLUMN_CLASS } from '../utils/Constants'

export default class Card {
  constructor(emitter, cardId, cardTitle, username, columnIndex) {
    this.$target = ''
    this.emitter = emitter
    this.id = cardId
    this.cardTitle = cardTitle
    this.username = username
    this.columnIndex = columnIndex

    this.init()
  }
}

Card.prototype.init = function () {
  this.setElements()
  this.bindEvent()
}

Card.prototype.setElements = function () {
  const template = `
    <div class='card'>
      <img class='document-icon' src='/static/images/document.svg') />
      <div class='content-container'>
        <div class='content-wrapper'>
          <div class='title'>${this.cardTitle}</div>
          <div class='added-by'>
            <span>Added by </span>
            <span class='strong'>${this.username}</span>
          </div>
        </div>
        <img class='${CARD_CLASS.REMOVE_BTN}' src='/static/images/remove-btn.svg' />
        </div>
    </div>
  `

  this.$target = templateToElement(template)
  this.$removeBtn = this.$target.querySelector(`.${CARD_CLASS.REMOVE_BTN}`)
}

Card.prototype.getTarget = function () {
  return this.$target
}

Card.prototype.bindEvent = function () {
  this.$removeBtn.addEventListener('click', () => {
    this.removeCard()
  })
  // this.$target.addEventListener('dblclick', this.editCard.bind(this))
  this.$target.ondblclick = (event) => {
    event.stopPropagation()
    this.editCard()
  }

  this.$target.addEventListener(
    'pointerdown',
    this.onDragStartHandler.bind(this)
  )
}

Card.prototype.editCard = function () {
  const modal = new EditCardModal(
    this.cardTitle,
    function edited(text) {
      this.cardTitle = text
      this.render()
    }.bind(this)
  )
  modal.showModal()
}

Card.prototype.removeCard = function () {
  const modal = new DeleteCardModal(
    this.cardTitle,
    function deleted() {
      this.$target.remove()
      this.emitter.emit(EVENT.REMOVE_CARD, this.id)
    }.bind(this)
  )
  modal.showModal()
}

Card.prototype.render = function () {
  this.$target.querySelector('.title').innerText = this.cardTitle
}

Card.prototype.onDragStartHandler = function (e) {
  this.gapWidth = this.$target.offsetWidth / 2
  this.gapHeight = this.$target.offsetHeight / 2
  this.$copyTarget = this.$target.cloneNode(true)

  this.$copyTarget.style.position = 'absolute'
  this.$copyTarget.style.top = `${e.clientY - this.gapHeight}px`
  this.$copyTarget.style.left = `${e.clientX - this.gapWidth}px`
  this.$copyTarget.style.width = `${this.$target.offsetWidth}px`

  const $columns = Array.from(
    document.querySelectorAll(`.${COLUMN_CLASS.COLUMN}`)
  )
  this.columnOffsetDatas = $columns.map(($column) => {
    const $cards = Array.from($column.querySelectorAll(`.${CARD_CLASS.CARD}`))
    const cardOffsetDatas = $cards.map(($card) => {
      return {
        element: $card,
        centerOffset: $card.offsetTop + $card.offsetHeight / 2,
      }
    })

    return {
      element: $column,
      centerOffset: $column.offsetLeft + $column.offsetWidth / 2,
      cardOffsetDatas,
    }
  })

  const pointermoveHandler = this.onPointerMoveHandler.bind(this)

  window.addEventListener('pointermove', pointermoveHandler)

  this.$copyTarget.addEventListener('pointerup', () => {
    window.removeEventListener('pointermove', pointermoveHandler)
  })

  // this.$target.classList.add(CLASS_NAME.DP_NONE)
  document.body.append(this.$copyTarget)
}

Card.prototype.onPointerMoveHandler = function (e) {
  this.$copyTarget.style.top = `${e.clientY - this.gapHeight}px`
  this.$copyTarget.style.left = `${e.clientX - this.gapWidth}px`

  this.findClosestColumn(e)
}

Card.prototype.findClosestColumn = function (e) {
  const [closestColumnOffsetData] = this.columnOffsetDatas.reduce(
    ([closestColumnOffsetData, minGap], columnOffsetData) => {
      const gap = Math.abs(columnOffsetData.centerOffset - e.clientX)

      if (minGap === -1 || gap < minGap) {
        minGap = gap
        closestColumnOffsetData = columnOffsetData
      }

      return [closestColumnOffsetData, minGap]
    },
    ['', -1]
  )

  this.findClosestCard(
    e,
    closestColumnOffsetData.element,
    closestColumnOffsetData.cardOffsetDatas
  )
}

Card.prototype.findClosestCard = function (e, $column, cardOffsetDatas) {
  const [closestCardOffsetData] = cardOffsetDatas.reduce(
    ([closestCardOffsetData, minGap], cardOffsetData) => {
      const gap = Math.abs(cardOffsetData.centerOffset - e.clientY)

      if (minGap === -1 || gap < minGap) {
        minGap = gap
        closestCardOffsetData = cardOffsetData
      }

      return [closestCardOffsetData, minGap]
    },
    ['', -1]
  )

  if (closestCardOffsetData.centerOffset < e.clientY) {
    console.log('down')
  } else {
    console.log('up')
  }
  console.log(closestCardOffsetData)
  console.log(closestCardOffsetData.element.querySelector('.title').innerHTML)
}
