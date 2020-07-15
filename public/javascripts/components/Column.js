import '../../stylesheets/components/column.scss'

export default class Column {
  constructor({ parentSelector, columnTitle, cardCount }) {
    this.parentSelector = parentSelector
    this.columnTitle = columnTitle
    this.cardCount = cardCount
    this.$target = ''

    this.init()
  }

  init() {
    this.setTarget()
    this.render()
  }

  setTarget() {
    const template = `
      <section class='column'>
        <div class='title-bar'>
          <div class='title-wrapper'>
            <div class='card-count'>${this.cardCount}</div>
            <div class='title'>${this.columnTitle}</div> 
          </div>
          <div class='btn-wrapper'>
            <img class='add-btn' src='/static/images/plus-btn.svg' alt='add-btn' />
            <img class='remove-btn' src='/static/images/remove-btn.svg' alt='remove-btn' />
          </div>
        </div>
        <div class='card-form-slot'></div>
        <div class='content-container'></div>
      </section>
    `

    this.$target = document.createRange().createContextualFragment(template)
  }

  render() {
    const parentElement = document.querySelector(this.parentSelector)
    parentElement.appendChild(this.$target)
  }
}
