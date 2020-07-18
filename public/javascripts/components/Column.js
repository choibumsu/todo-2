import { templateToElement } from '../utils/HtmlGenerator'
import {
  COLUMN_CLASS,
  CARD_CLASS,
  CARD_FORM_CLASS,
  CLASS_NAME,
} from '../utils/Constants'
import '../../stylesheets/components/column.scss'
import CardForm from './CardForm'
import Card from './Card'
import EditColumnModal from './Modal/EditColumnModal'
import EditCardModal from './Modal/EditCardModal'
import DeleteCardModal from './Modal/DeleteCardModal'
export default class Column {
  constructor({ columnTitle, cardDatas }) {
    this.$target = ''
    this.columnTitle = columnTitle
    this.cardList = Array(cardDatas.length)
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
      <section class='${COLUMN_CLASS.COLUMN}'>
        <div class='title-bar'>
          <div class='title-wrapper'>
            <div class='${COLUMN_CLASS.CARD_COUNT}'>
              ${this.cardList.length}
            </div>
            <div class='${COLUMN_CLASS.TITLE}'>${this.columnTitle}</div> 
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
    this.$columnTitle = this.$target.querySelector(`.${COLUMN_CLASS.TITLE}`)
    this.$cardCount = this.$target.querySelector(`.${COLUMN_CLASS.CARD_COUNT}`)
    this.$contentContainer = this.$target.querySelector(
      `.${COLUMN_CLASS.CONTENT_CONTAINER}`
    )
  }

  setCardList(cardDatas) {
    this.cardList = cardDatas.map((cardData) => {
      const card = new Card(cardData)
      this.$contentContainer.prepend(card.getTarget())
      return card
    })
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
    // let clicks = 0
    // const delay = 400

    // function e2(e) {
    //   clicks++

    //   setTimeout(function () {
    //     clicks = 0
    //   }, delay)

    //   if (clicks === 2) {
    //     clicks = 0
    //     return
    //   } else {
    //     console.log('pointerdown')
    //   }
    // }
    // e2.bind(this)
    this.$target.addEventListener(
      'pointerdown',
      this.onPointerDownHandler.bind(this)
    )
    this.$target.addEventListener('click', this.onClickHandler.bind(this))
    this.$target.addEventListener(
      'dblclick',
      this.onDoubleClickHandler.bind(this)
    )
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

  addCard() {
    const cardTitle = this.cardForm.getCardTitle()
    if (cardTitle === '') return

    // api 호출 후 id 받기
    const cardData = {
      id: 1,
      title: cardTitle,
      username: 'choibumsu',
      nextCardId: this.getNewNextCardId(),
    }

    const newCard = new Card(cardData)
    this.cardList.push(newCard)
    this.$contentContainer.prepend(newCard.getTarget())

    this.setCardCount()
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
    })
    modal.showModal()
  }

  removeCard(removedCard) {
    const removedCardId = removedCard.getId()

    this.removeNextCardId(removedCardId)

    this.cardList = this.cardList.filter(
      (card) => card.getId() !== removedCardId
    )

    removedCard.removeTarget()
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
    const newCardCount = this.$target.querySelectorAll(`.${CARD_CLASS.CARD}`)
      .length
    this.$cardCount.innerHTML = newCardCount
  }

  showColumnEditModal() {
    this.$columnTitle.classList.add(CLASS_NAME.US_NONE)

    const modal = new EditColumnModal(this.columnTitle, (editedTitle) => {
      this.setColumnTitle(editedTitle)
    })
    modal.showModal()
    this.$columnTitle.classList.remove(CLASS_NAME.US_NONE)
  }

  setColumnTitle(editedTitle) {
    this.columnTitle = editedTitle
    this.$columnTitle.innerText = this.columnTitle
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
    document.body.classList.add(CLASS_NAME.US_NONE)

    const movedCard = this.cardList.find(
      (card) => card.getId() === +targetCard.dataset.id
    )
    movedCard.moveStart(e)
  }

  onPointerMoveHandler(e) {}

  onPointerMoveHandler(e) {}
}
