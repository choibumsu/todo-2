const {
  fetchColumn,
  fetchCard,
  updateColumnTitle,
  updateCardTitle,
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
