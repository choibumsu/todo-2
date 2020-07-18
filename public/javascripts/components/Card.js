import { templateToElement } from '../utils/HtmlGenerator'
import '../../stylesheets/components/card.scss'
import { CARD_CLASS, CLASS_NAME, COLUMN_CLASS } from '../utils/Constants'

export default class Card {
  constructor({ id, title, username, nextCardId }) {
    this.$target = ''
    this.id = id
    this.title = title
    this.username = username
    this.nextCardId = nextCardId
    this.containerHalfGap = 0
    this.cardHalfGap = 0

    this.init()
  }

  init() {
    this.setElements()
  }

  setElements() {
    this.template = `
      <div class='card' data-id='${this.id}'>
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
    this.$title = this.$target.querySelector(`.${CARD_CLASS.TITLE}`)
  }

  removeTarget() {
    this.$target.remove()
  }

  moveStart(e) {
    this.setContainerHalfGap()
    this.setCardHalfGap()
    this.copyTarget(e)
    this.moveNodesFunc = this.moveNodes.bind(this)
    this.moveStopFunc = this.moveStop.bind(this)

    window.addEventListener('pointermove', this.moveNodesFunc)
    window.addEventListener('pointerup', this.moveStopFunc)
  }

  setContainerHalfGap() {
    const $firstContainer = document.querySelector(
      `.${COLUMN_CLASS.CONTENT_CONTAINER}`
    )
    if (!$firstContainer) return

    const $secondContainer = $firstContainer
      .closest(`.${COLUMN_CLASS.COLUMN}`)
      .nextElementSibling.querySelector(`.${COLUMN_CLASS.CONTENT_CONTAINER}`)
    if (!$secondContainer) return

    this.columnHalfGap =
      ($secondContainer.offsetLeft -
        $firstContainer.offsetLeft -
        $firstContainer.offsetWidth) /
      2
  }

  setCardHalfGap() {
    const $containers = Array.from(
      document.querySelectorAll(`.${COLUMN_CLASS.CONTENT_CONTAINER}`)
    )
    const twoCardsContainer = $containers.find(
      ($container) =>
        $container.querySelectorAll(`.${CARD_CLASS.CARD}`).length > 1
    )

    if (!twoCardsContainer) return

    const $firstCard = twoCardsContainer.querySelector(`.${CARD_CLASS.CARD}`)
    const $secondCard = $firstCard.nextElementSibling

    this.cardHalfGap =
      ($secondCard.offsetTop - $firstCard.offsetTop - $firstCard.offsetHeight) /
      2
  }

  copyTarget(e) {
    this.$copyTarget = this.$target.cloneNode(true)
    this.$copyTarget.style.width = `${this.$target.offsetWidth}px`
    this.$copyTarget.style.pointerEvents = 'none'
    this.$copyTarget.style.opacity = '0.8'
    this.$copyTarget.style.position = 'absolute'
    this.$copyTarget.style.top = `${this.$target.offsetTop}px`
    this.$copyTarget.style.left = `${this.$target.offsetLeft}px`
    this.offsetDiff = {
      top: e.pageY - this.$target.offsetTop,
      left: e.pageX - this.$target.offsetLeft,
    }

    this.$target.classList.add(CARD_CLASS.MOVING)
    document.body.appendChild(this.$copyTarget)
  }

  moveNodes(e) {
    const $points = this.setPoints()
    this.moveTarget($points)
    this.moveCopy(e)
  }

  setPoints() {
    const $firstPoint = document.elementFromPoint(
      this.$copyTarget.offsetLeft +
        this.$copyTarget.offsetWidth / 2 -
        this.containerHalfGap,
      this.$copyTarget.offsetTop +
        this.$copyTarget.offsetHeight / 2 -
        this.cardHalfGap
    )

    const $secondPoint = document.elementFromPoint(
      this.$copyTarget.offsetLeft +
        this.$copyTarget.offsetWidth / 2 +
        this.containerHalfGap,
      this.$copyTarget.offsetTop +
        this.$copyTarget.offsetHeight / 2 +
        this.cardHalfGap
    )

    return [$firstPoint, $secondPoint]
  }

  moveTarget($points) {
    if ($points.filter(($point) => !$point).length > 0) return

    for (const $point of $points) {
      const $closestCard = $point.closest(`.${CARD_CLASS.CARD}`)
      if ($closestCard) {
        this.insertAtCard($closestCard)
        return
      }
    }

    for (const $point of $points) {
      const $closestContainer = $point.closest(
        `.${COLUMN_CLASS.CONTENT_CONTAINER}`
      )
      if ($closestContainer) {
        $closestContainer.appendChild(this.$target)
        return
      }
    }
  }

  insertAtCard($originCard) {
    if (+$originCard.dataset.id === this.id) {
      return
    }

    if ($originCard.offsetTop < this.$copyTarget.offsetTop) {
      $originCard.parentNode.insertBefore(
        this.$target,
        $originCard.nextElementSibling
      )
      return
    }

    $originCard.parentNode.insertBefore(this.$target, $originCard)
  }

  moveCopy(e) {
    this.$copyTarget.style.top = `${e.pageY - this.offsetDiff.top}px`
    this.$copyTarget.style.left = `${e.pageX - this.offsetDiff.left}px`
  }

  moveStop(e) {
    this.$copyTarget.remove()
    this.$target.classList.remove(CARD_CLASS.MOVING)
    document.body.classList.remove(CLASS_NAME.US_NONE)
    window.removeEventListener('pointermove', this.moveNodesFunc)
    window.removeEventListener('pointerup', this.moveStopFunc)
  }

  getTarget() {
    return this.$target
  }

  getId() {
    return this.id
  }

  getTitle() {
    return this.title
  }

  setTitle(editedTitle) {
    this.title = editedTitle
    this.$title.innerText = this.title
  }

  setNextCardId(nextCardId) {
    this.nextCardId = nextCardId
  }
}
