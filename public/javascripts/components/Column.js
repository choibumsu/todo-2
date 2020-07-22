import { templateToElement } from '../utils/HtmlGenerator'
import {
  COLUMN_CLASS,
  CARD_CLASS,
  CARD_FORM_CLASS,
  CLASS_NAME,
  EVENT,
} from '../utils/Constants'
import emitter from '../utils/EventEmitter'
import '../../stylesheets/components/column.scss'

import CardForm from './CardForm'
import Card from './Card'
import EditColumnModal from './Modal/EditColumnModal'
import EditCardModal from './Modal/EditCardModal'
import DeleteCardModal from './Modal/DeleteCardModal'
import { updateColumnTitle, createCardApi, deleteColumnApi } from '../api/index'

export default class Column {
  constructor({ id, title, cardDatas }) {
    this.$target = ''
    this.id = id
    this.title = title
    this.cardList = Array(Object.keys(cardDatas).length)
    this.cardForm = new CardForm()

    this.init(cardDatas)
  }

  init(cardDatas) {
    this.setElements()
    this.setCardList(cardDatas)
    this.setCardForm()
    this.render()
    this.bindEvent()
  }

  setElements() {
    const template = `
      <section class='${COLUMN_CLASS.COLUMN}' data-id='${this.id}'>
        <div class='title-bar'>
          <div class='title-wrapper'>
            <div class='${COLUMN_CLASS.CARD_COUNT}'>
              ${this.cardList.length}
            </div>
            <div class='${COLUMN_CLASS.TITLE}'>${this.title}</div> 
          </div>
          <div class='btn-wrapper'>
            <img class='${COLUMN_CLASS.ADD_BTN}' src='/static/images/plus-btn.svg' alt='add-btn' />
            <img class='${COLUMN_CLASS.REMOVE_BTN}' src='/static/images/remove-btn.svg' alt='remove-btn' />
          </div>
        </div>
        <div class='${COLUMN_CLASS.CARD_FORM_SLOT}'></div>
        <div class='${COLUMN_CLASS.CONTENT_CONTAINER}'></div>
      </section>
    `

    this.$target = templateToElement(template)
    this.$title = this.$target.querySelector(`.${COLUMN_CLASS.TITLE}`)
    this.$cardCount = this.$target.querySelector(`.${COLUMN_CLASS.CARD_COUNT}`)
    this.$contentContainer = this.$target.querySelector(
      `.${COLUMN_CLASS.CONTENT_CONTAINER}`
    )
  }

  setCardList(cardDatas) {
    this.cardList = []

    let [cardData, nextCardId] = [cardDatas[0], 0]
    while (cardData !== undefined) {
      const card = new Card({ nextCardId, ...cardData })

      this.cardList.push(card)
      this.$contentContainer.prepend(card.getTarget())
      nextCardId = cardData.id
      cardData = cardDatas[cardData.id]
    }
  }

  setCardForm() {
    const $cardFormSlot = this.$target.querySelector(
      `.${COLUMN_CLASS.CARD_FORM_SLOT}`
    )
    $cardFormSlot.appendChild(this.cardForm.getTarget())
  }

  render() {
    const $columnContainer = document.querySelector(
      `.${COLUMN_CLASS.CONTAINER}`
    )
    $columnContainer.appendChild(this.$target)
  }

  bindEvent() {
    this.$target.addEventListener(
      'pointerdown',
      this.onPointerDownHandler.bind(this)
    )
    this.$target.addEventListener('click', this.onClickHandler.bind(this))
    this.$target.addEventListener(
      'dblclick',
      this.onDoubleClickHandler.bind(this)
    )

    emitter.on(`${EVENT.INSERT_CARD}-${this.id}`, this.insertCard.bind(this))
    emitter.on(`${EVENT.REMOVE_CARD}-${this.id}`, this.removeCard.bind(this))
  }

  onPointerDownHandler(e) {
    const targetCard = e.target.closest(`.${CARD_CLASS.CARD}`)
    if (targetCard) {
      this.dragStart(e, targetCard)
      return
    }
  }

  onClickHandler(e) {
    if (e.target.classList.contains(COLUMN_CLASS.ADD_BTN)) {
      this.cardForm.toggleCardForm()
      return
    }

    if (e.target.classList.contains(COLUMN_CLASS.REMOVE_BTN)) {
      this.removeColumn()
      return
    }

    if (e.target.classList.contains(CARD_CLASS.REMOVE_BTN)) {
      this.showCardDeleteModal(e)
      return
    }

    if (e.target.classList.contains(CARD_FORM_CLASS.ADD_BTN)) {
      this.addCard()
      return
    }

    if (e.target.classList.contains(CARD_FORM_CLASS.CANCEL_BTN)) {
      this.cardForm.toggleCardForm()
      return
    }
  }

  onDoubleClickHandler(e) {
    if (e.target.classList.contains(COLUMN_CLASS.TITLE)) {
      this.showColumnEditModal()
      return
    }

    const targetCard = e.target.closest(`.${CARD_CLASS.CARD}`)
    if (targetCard) {
      this.showCardEditModal(targetCard)
      return
    }
  }

  async removeColumn() {
    const removeConfirm = confirm('정말 컬럼을 삭제하시겠습니까?')

    if (!removeConfirm) return

    const status = await deleteColumnApi({
      id: this.id,
      userId: 1,
    })

    if (status === 200) {
      this.$target.remove()
      return
    } else if (status === 401) {
      alert('컬럼 삭제 권한이 없습니다.')
      return
    } else if (status === 404) {
      alert('컬럼이 존재하지 않습니다.')
      return
    }

    // unexcepted error
    alert('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.')
  }

  async addCard() {
    const cardTitle = this.cardForm.getCardTitle()
    if (cardTitle === '') return

    const [data, status] = await createCardApi({
      cardTitle,
      columnId: this.id,
      userId: 1,
    })

    if (status === 200) {
      const cardData = {
        id: data.id,
        title: cardTitle,
        username: 'choibumsu',
        nextCardId: this.getNewNextCardId(),
      }

      const newCard = new Card(cardData)
      this.cardList.push(newCard)
      this.$contentContainer.prepend(newCard.getTarget())

      this.setCardCount()
      return
    } else if (status === 401) {
      alert('카드 추가 권한이 없습니다.')
      return
    } else if (status === 404) {
      alert('컬럼이 존재하지 않습니다.')
      return
    }

    // unexcepted error
    alert('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.')
  }

  getNewNextCardId() {
    if (this.cardList.length === 0) {
      return 0
    }

    return this.cardList[this.cardList.length - 1].getId()
  }

  showCardDeleteModal(e) {
    const removedCardId = parseInt(
      e.target.closest(`.${CARD_CLASS.CARD}`).dataset.id
    )
    const removedCard = this.cardList.find(
      (card) => card.getId() === removedCardId
    )

    const modal = new DeleteCardModal(removedCard.getTitle(), () => {
      this.removeCard(removedCard)
      removedCard.removeTarget()
    })
    modal.showModal()
  }

  removeCard(removedCard) {
    const removedCardId = removedCard.getId()

    this.removeNextCardId(removedCardId)

    this.cardList = this.cardList.filter(
      (card) => card.getId() !== removedCardId
    )
    this.setCardCount()
  }

  removeNextCardId(removedCardId) {
    const removedIndex = this.cardList.findIndex(
      (card) => card.getId() === removedCardId
    )

    if (removedIndex === this.cardList.length - 1) return

    const prevCard = this.cardList[removedIndex + 1]

    if (removedIndex === 0) {
      prevCard.setNextCardId(0)
      return
    }

    const nextCard = this.cardList[removedIndex - 1]
    prevCard.setNextCardId(nextCard.getId())
  }

  setCardCount() {
    this.$cardCount.innerHTML = this.cardList.length
  }

  showColumnEditModal() {
    this.$title.classList.add(CLASS_NAME.US_NONE)

    const modal = new EditColumnModal(this.title, (editedTitle) => {
      this.setTitle(editedTitle)
    })
    modal.showModal()
    this.$title.classList.remove(CLASS_NAME.US_NONE)
  }

  setTitle(editedTitle) {
    updateColumnTitle({
      title: editedTitle,
      id: this.id,
    })
    this.title = editedTitle
    this.$title.innerText = this.title
  }

  showCardEditModal(targetCard) {
    const editedCard = this.cardList.find(
      (card) => card.getId() === +targetCard.dataset.id
    )

    const modal = new EditCardModal(editedCard.getTitle(), (editedTitle) => {
      editedCard.setTitle(editedTitle)
    })
    modal.showModal()
  }

  dragStart(e, targetCard) {
    const movedCard = this.cardList.find(
      (card) => card.getId() === +targetCard.dataset.id
    )
    movedCard.moveStart(e)
  }

  insertCard(insertedCard) {
    const $insertedCard = insertedCard.getTarget()
    const $nextCard = $insertedCard.nextElementSibling
    const $prevCard = $insertedCard.previousElementSibling

    this.updateNextCard(insertedCard, $nextCard)
    this.updatePrevCard(insertedCard, $prevCard)

    if ($nextCard) {
      const nextCardIndex = this.cardList.findIndex(
        (card) => card.getId() === +$nextCard.dataset.id
      )
      this.cardList.splice(nextCardIndex + 1, 0, insertedCard)
    } else if ($prevCard) {
      const prevCardIndex = this.cardList.findIndex(
        (card) => card.getId() === +$prevCard.dataset.id
      )
      this.cardList.splice(prevCardIndex, 0, insertedCard)
    } else {
      this.cardList.push(insertedCard)
    }

    this.setCardCount()
  }

  updateNextCard(insertedCard, $nextCard) {
    if ($nextCard) {
      insertedCard.setNextCardId(+$nextCard.dataset.id)
      return
    }
    insertedCard.setNextCardId(0)
  }

  updatePrevCard(insertedCard, $prevCard) {
    if ($prevCard) {
      const prevCard = this.cardList.find(
        (card) => card.getId() === +$prevCard.dataset.id
      )
      prevCard.setNextCardId(insertedCard.getId())
    }
  }

  getTarget() {
    return this.$target
  }
}
