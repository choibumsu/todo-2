const {
  fetchColumn,
  fetchCard,
  updateColumnTitle,
  updateCardTitle,
  createCard,
  deleteCard,
} = require('./model')

exports.getAllColumnsController = async (req, res, next) => {
  try {
    const rows = await fetchColumn()
    res.json(rows)
  } catch (e) {
    console.log(e)
  }
}

exports.getAllCardsController = async (req, res, next) => {
  try {
    const rows = await fetchCard()
    res.json(rows)
  } catch (e) {
    console.log(e)
  }
}

exports.updateColumnNameController = async (req, res, next) => {
  try {
    const { title, id } = req.body
    const rows = await updateColumnTitle(title, id)
    res.json(rows)
  } catch (e) {
    console.log(e)
  }
}

exports.updateCardNameController = async (req, res, next) => {
  try {
    const { title, id } = req.body
    const rows = await updateCardTitle(title, id)
    res.json(rows)
  } catch (e) {
    console.log(e)
  }
}

exports.deleteCardController = async (req, res, next) => {
  try {
    const { id } = req.body
    const rows = await deleteCard(id)
    res.json(rows)
  } catch (e) {
    console.log(e)
  }
}

exports.createCardController = async (req, res, next) => {
  // 유저 유효성 검사 : return 401

  try {
    const result = await createCard(req.body)
    const newCardId = result[0].insertId

    res.status(200).json({
      id: newCardId,
    })
  } catch (err) {
    console.log(err)
    res.status(404).json()
  }
}
