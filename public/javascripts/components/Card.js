import { templateToElement } from '../utils/HtmlGenerator'
import EditCardModal from './Modal/EditCardModal'
import '../../stylesheets/components/card.scss'
import DeleteCardModal from './Modal/DeleteCardModal'
import { CARD_CLASS, EVENT, COLUMN_CLASS } from '../utils/Constants'

export default class Card {
  constructor({ id, title, username, nextCardId }) {
    this.$target = ''
    this.id = id
    this.title = title
    this.username = username
    this.nextCardId = nextCardId

    this.init()
  }

  init() {
    this.setElements()
    // this.bindEvent()
  }

  setElements() {
    this.template = `
      <div class='card'>
        <img class='document-icon' src='/static/images/document.svg') />
        <div class='content-container'>
          <div class='content-wrapper'>
            <div class='${CARD_CLASS.TITLE}'>${this.title}</div>
            <div class='added-by'>
              <span>Added by </span>
              <span class='strong'>${this.username}</span>
            </div>
          </div>
          <img class='${CARD_CLASS.REMOVE_BTN}' src='/static/images/remove-btn.svg' />
          </div>
      </div>
    `

    this.$target = templateToElement(this.template)
    this.$removeBtn = this.$target.querySelector(`.${CARD_CLASS.REMOVE_BTN}`)
  }

  getTarget() {
    return this.$target
  }

  getId() {
    return this.id
  }

  bindEvent() {
    this.$removeBtn.addEventListener('click', () => {
      this.removeCard()
    })
    // this.$target.addEventListener('dblclick', this.editCard.bind(this))
    // this.$target.ondblclick = (event) => {
    //   event.stopPropagation()
    //   this.editCard()
    // }
    var clicks = 0
    var delay = 400
    this.$target.addEventListener('pointerdown', e2.bind(this))

    function e2(e) {
      // event.stopPropagation()
      clicks++

      setTimeout(function () {
        clicks = 0
      }, delay)

      if (clicks === 2) {
        this.editCard()
        console.log('더블클릭')
        clicks = 0
        return
      } else {
        this.onDragStartHandler(e)
        console.log('포인터다운')
      }
    }
  }

  editCard() {
    const modal = new EditCardModal(
      this.cardTitle,
      function edited(text) {
        this.cardTitle = text
        this.render()
      }.bind(this)
    )
    modal.showModal()
  }

  removeCard() {
    const modal = new DeleteCardModal(
      this.cardTitle,
      function deleted() {
        this.$target.remove()
        // this.emitter.emit(EVENT.REMOVE_CARD, this.id)
      }.bind(this)
    )
    modal.showModal()
  }

  render() {
    this.$target.querySelector('.title').innerText = this.cardTitle
  }

  onDragStartHandler(e) {
    if (
      e.target.classList.contains(CARD_CLASS.TITLE) ||
      e.target.classList.contains(CARD_CLASS.REMOVE_BTN)
    ) {
      return
    }

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

    this.columnDatas = $columns.map(($column) => {
      const $cards = Array.from($column.querySelectorAll(`.${CARD_CLASS.CARD}`))
      const cardDatas = $cards.map(($card) => {
        return {
          $element: $card,
          centerOffset: $card.offsetTop + $card.offsetHeight / 2,
        }
      })

      return {
        $element: $column,
        centerOffset: $column.offsetLeft + $column.offsetWidth / 2,
        cardDatas,
      }
    })

    const pointermoveHandler = this.onPointerMoveHandler.bind(this)

    window.addEventListener('pointermove', pointermoveHandler)

    this.$copyTarget.addEventListener('pointerup', (e) => {
      window.removeEventListener('pointermove', pointermoveHandler)

      if (this.closestCardData === undefined) {
        this.closestColumnData.$element
          .querySelector(`.${COLUMN_CLASS.CONTENT_CONTAINER}`)
          .appendChild(this.$target)

        this.$target.classList.remove(CARD_CLASS.MOVING)
        this.$copyTarget.remove()
        return
      }

      const $closestCard = this.closestCardData.$element
      if (this.closestCardData.centerOffset < e.clientY) {
        $closestCard.parentNode.insertBefore(
          this.$target,
          $closestCard.nextElementSibling
        )
      } else {
        $closestCard.parentNode.insertBefore(this.$target, $closestCard)
      }

      this.$target.classList.remove(CARD_CLASS.MOVING)
      this.$copyTarget.remove()
    })

    this.$target.classList.add(CARD_CLASS.MOVING)
    document.body.append(this.$copyTarget)
  }

  onPointerMoveHandler(e) {
    this.$copyTarget.style.top = `${e.clientY - this.gapHeight}px`
    this.$copyTarget.style.left = `${e.clientX - this.gapWidth}px`

    this.findClosestColumn(e)
  }

  findClosestColumn(e) {
    ;[this.closestColumnData] = this.columnDatas.reduce(
      ([closestColumnData, minGap], columnData) => {
        const gap = Math.abs(columnData.centerOffset - e.clientX)

        if (minGap === -1) {
          return [columnData, gap]
        }

        if (gap < minGap) {
          closestColumnData = columnData
          minGap = gap
        }

        return [closestColumnData, minGap]
      },
      [, -1]
    )

    this.findClosestCard(e, this.closestColumnData.cardDatas)
  }

  findClosestCard(e, cardDatas) {
    ;[this.closestCardData] = cardDatas.reduce(
      ([closestCardData, minGap], cardData) => {
        const gap = Math.abs(cardData.centerOffset - e.clientY)

        if (minGap === -1) {
          return [cardData, gap]
        }

        if (gap < minGap) {
          closestCardData = cardData
          minGap = gap
        }

        return [closestCardData, minGap]
      },
      [, -1]
    )
  }
}
