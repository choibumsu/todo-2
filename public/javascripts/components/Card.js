import { templateToElement } from '../utils/HtmlGenerator'
import EditCardModal from './Modal/EditCardModal'
import '../../stylesheets/components/card.scss'
import DeleteCardModal from './Modal/DeleteCardModal'
import { CARD_CLASS, EVENT, COLUMN_CLASS } from '../utils/Constants'

export default class Card {
  constructor(emitter, cardId, cardTitle, username, columnIndex) {
    this.$target = ''
    this.emitter = emitter
    this.id = cardId
    this.cardTitle = cardTitle
    this.username = username
    this.columnIndex = columnIndex
    //드래그 시 쓰일 변수
    this.flag = false
    this.offsetx
    this.offsety

    this.init()
  }

  init() {
    this.setElements()
    this.bindEvent()
  }

  setElements() {
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

  getTarget() {
    return this.$target
  }

  bindEvent() {
    this.$removeBtn.addEventListener('click', () => {
      this.removeCard()
    })

    this.$target.addEventListener('pointerdown', checkClick.bind(this))

    let clicks = 0
    const delay = 400
    function checkClick(e) {
      clicks++
      setTimeout(function () {
        clicks = 0
      }, delay)

      if (clicks === 2) {
        this.editCard()
        clicks = 0
        return
      }
      this.chooseCard(e)
    }
    this.$target.addEventListener('pointermove', (e) => {
      this.moveCard(e)
    })
    this.$target.addEventListener('pointerup', (e) => {
      this.fixCard(e)
    })
  }

  //카드 색깔 초기화
  setCardColor() {
    let allCard = document.querySelectorAll('.card')
    allCard.forEach((card) => {
      card.style.borderColor = 'rgba(209, 213, 218, 0.5)'
    })
  }

  insertCard(e, cardObj) {
    let coulmnElement = this.closetElement.closest('.column')

    //아동한 곳이 컬럼이 아닌 경우
    if (!coulmnElement) return

    //카드중에 선택한 카드는 제외
    let allCard = coulmnElement.querySelectorAll('.card:not(.target)')

    //컬럼 내에 카드 없을 경우 바로 넣기
    if (!allCard.length) {
      coulmnElement = coulmnElement.querySelector('.content-container')
      coulmnElement.append(cardObj)
      return
    }

    //카드가 있을 경우 유효범위 계산하기
    let nextCard = null

    for (let i = 0; i < allCard.length; i++) {
      let card = allCard[i]
      if (e.pageY < card.offsetTop + card.offsetHeight / 2) {
        nextCard = card
        break
      }
    }

    //맨 마지막 카드로 들어갈 경우
    if (!nextCard) {
      nextCard = allCard[allCard.length - 1]
      nextCard.insertAdjacentElement('afterend', cardObj)
    } else nextCard.insertAdjacentElement('beforebegin', cardObj)
  }

  //옮길 카드 설정
  chooseCard(e) {
    this.flag = true
    this.setCardColor()
    this.preview = this.$target.cloneNode(true)
    this.$target.classList.add('target')

    let width = this.$target.offsetWidth
    this.offsetx = e.offsetX
    this.offsety = e.offsetY
    this.$target.insertAdjacentElement('afterend', this.preview)
    this.$target.style.position = 'absolute'
    this.$target.style.width = width + 'px'
  }

  //카드 이동
  moveCard(e) {
    if (this.flag === true) {
      this.$target.style.borderColor = 'blue'
      this.preview.style.opacity = '0.5'
      this.$target.style.left = e.pageX - this.offsetx + 'px'
      this.$target.style.top = e.pageY - this.offsety + 'px'
      this.$target.style.zIndex = 1

      this.$target.style.display = 'none'
      this.closetElement = document.elementFromPoint(e.pageX, e.pageY)
      this.$target.style.display = ''
      this.insertCard(e, this.preview)
    }
  }

  //카드 고정
  fixCard(e) {
    if (this.flag === true) {
      this.flag = false
    }
    this.preview.remove()
    this.$target.classList.remove('target')
    this.$target.style.position = ''
    this.$target.style.width = ''
    this.$target.style.left = ''
    this.$target.style.top = ''
    this.$target.style.zIndex = ''

    this.closetElement = document.elementFromPoint(e.pageX, e.pageY)
    this.insertCard(e, this.$target)
    this.$target.style.borderColor = 'blue'
  }

  editCard(e) {
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
        this.emitter.emit(EVENT.REMOVE_CARD, this.id)
      }.bind(this)
    )
    modal.showModal()
  }

  render() {
    this.$target.querySelector('.title').innerText = this.cardTitle
  }
}
