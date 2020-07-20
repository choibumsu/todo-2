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

    this.init()
  }

  init() {
    this.setElements()
  }

  setElements() {
    this.template = `
      <div class='card' data-id='${this.id}'>
        <div class='card-content'>
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
      </div>
    `

    this.$target = templateToElement(this.template)
    this.$title = this.$target.querySelector(`.${CARD_CLASS.TITLE}`)
  }

  // 드래그 시작시 실행 함수
  moveStart(e) {
    this.setPointOffset()
    this.copyTarget(e)
    this.toggleMovingStyle()

    this.moveNodesFunc = this.moveNodes.bind(this)
    this.moveStopFunc = this.moveStop.bind(this)
    window.addEventListener('pointermove', this.moveNodesFunc)
    window.addEventListener('pointerup', this.moveStopFunc)
  }

  // pointOffsetDiff : 카드 가운데를 기준으로 4개 점을 선택, 점 간 간격은 카드와 컨테이너 간격
  setPointOffset() {
    const targetHalfWidth = this.$target.offsetWidth / 2
    const targetHalfHeight = this.$target.offsetHeight / 2
    const containerHalfGap = this.getContainerHalfGap()
    const cardHalfGap = this.getCardHalfGap()

    this.pointOffsetDiffs = [
      {
        x: targetHalfWidth - containerHalfGap,
        y: targetHalfHeight - cardHalfGap,
      },
      {
        x: targetHalfWidth + containerHalfGap,
        y: targetHalfHeight - cardHalfGap,
      },
      {
        x: targetHalfWidth + containerHalfGap,
        y: targetHalfHeight + cardHalfGap,
      },
      {
        x: targetHalfWidth - containerHalfGap,
        y: targetHalfHeight + cardHalfGap,
      },
    ]
  }

  // 카드 컨테이너 사이의 가로 간격을 계산
  getContainerHalfGap() {
    const $firstContainer = document.querySelector(
      `.${COLUMN_CLASS.CONTENT_CONTAINER}`
    )
    if (!$firstContainer) return 0

    const $secondColumn = $firstContainer.closest(`.${COLUMN_CLASS.COLUMN}`)
      .nextElementSibling
    if (!$secondColumn) return 0

    const $secondContainer = $secondColumn.querySelector(
      `.${COLUMN_CLASS.CONTENT_CONTAINER}`
    )

    const columnHalfGap =
      ($secondContainer.offsetLeft -
        $firstContainer.offsetLeft -
        $firstContainer.offsetWidth) /
      2

    return columnHalfGap
  }

  // 카드 사이의 세로 간격을 계산
  getCardHalfGap() {
    const $containers = Array.from(
      document.querySelectorAll(`.${COLUMN_CLASS.CONTENT_CONTAINER}`)
    )
    const twoCardsContainer = $containers.find(
      ($container) =>
        $container.querySelectorAll(`.${CARD_CLASS.CARD}`).length > 1
    )

    if (!twoCardsContainer) return 0

    const $firstCard = twoCardsContainer.querySelector(`.${CARD_CLASS.CARD}`)
    const $secondCard = $firstCard.nextElementSibling

    const cardHalfGap =
      ($secondCard.offsetTop - $firstCard.offsetTop - $firstCard.offsetHeight) /
      2

    return cardHalfGap
  }

  // 카드를 복사
  copyTarget(e) {
    this.$copyTarget = this.$target.cloneNode(true)
    this.$copyTarget.style.left = `${this.$target.offsetLeft}px`
    this.$copyTarget.style.top = `${this.$target.offsetTop}px`
    this.$copyTarget.style.width = `${this.$target.offsetWidth}px`
    this.$copyTarget.classList.add(CARD_CLASS.COPY)

    this.offsetDiff = {
      left: e.pageX - this.$target.offsetLeft,
      top: e.pageY - this.$target.offsetTop,
    }

    document.body.appendChild(this.$copyTarget)

    /* will be deleted */
    const div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.left = `calc(50% - ${this.getContainerHalfGap()}px)`
    div.style.top = `calc(50% - ${this.getCardHalfGap()}px)`
    div.style.width = `${this.getContainerHalfGap() * 2}px`
    div.style.height = `${this.getCardHalfGap() * 2}px`
    div.style.backgroundColor = 'red'
    this.$copyTarget.appendChild(div)
  }

  // 카드 이동 효과 토글 함수
  toggleMovingStyle() {
    if (this.$target.classList.contains(CARD_CLASS.MOVING)) {
      document.body.classList.remove(CLASS_NAME.US_NONE)
      this.$target.classList.remove(CARD_CLASS.MOVING)
      return
    }

    document.body.classList.add(CLASS_NAME.US_NONE)
    this.$target.classList.add(CARD_CLASS.MOVING)
  }

  // pointermove 이벤트 발생시 실행 함수
  moveNodes(e) {
    const $points = this.setPoints() // 복제된 카드 중앙에 4개 점을 계산
    this.moveTarget($points) // 4개의 점을 기준으로 카드를 이동
    this.moveCopy(e) // 복제된 카드는 커서를 따라 이동
  }

  // 복제된 카드의 중앙 4개점에 해당하는 dom객체를 반환
  setPoints() {
    const $points = this.pointOffsetDiffs.map((pointOffsetDiff) => {
      return document.elementFromPoint(
        this.$copyTarget.offsetLeft + pointOffsetDiff.x,
        this.$copyTarget.offsetTop + pointOffsetDiff.y
      )
    })

    return $points
  }

  moveTarget($points) {
    if ($points.filter(($point) => !$point).length > 0) return

    // 포인트와 겹치는 DOM 객체 중 카드가 있는지 검사, 있으면 그 카드 기준으로 target을 넣고 함수 종료
    for (const $point of $points) {
      const $closestCard = $point.closest(`.${CARD_CLASS.CARD}`)
      if ($closestCard) {
        this.insertAtCard($closestCard)
        return
      }
    }

    // 포인트와 겹치는 컨테이너가 있는지 검사, 있으면 컨테이너에 append
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

  // 가장 가까운 카드와 높이 비교를 하여 앞이나 뒤로 target을 넣음
  insertAtCard($originCard) {
    // target 본인은 제외
    if (+$originCard.dataset.id === this.id) {
      return
    }

    // target이 더 밑에 있으면 insertAfter
    if ($originCard.offsetTop < this.$copyTarget.offsetTop) {
      $originCard.parentNode.insertBefore(
        this.$target,
        $originCard.nextElementSibling
      )
      return
    }
    // target이 더 위에 있으면 insetBefore
    $originCard.parentNode.insertBefore(this.$target, $originCard)
  }

  moveCopy(e) {
    this.$copyTarget.style.left = `${e.pageX - this.offsetDiff.left}px`
    this.$copyTarget.style.top = `${e.pageY - this.offsetDiff.top}px`
  }

  // pointerup 이벤트 발생시 실행되는 함수
  moveStop() {
    this.$copyTarget.remove()
    this.toggleMovingStyle()

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

  removeTarget() {
    this.$target.remove()
  }
}
