const {
  fetchColumn,
  fetchCard,
  updateColumnTitle,
  updateCardTitle,
} = require('./model')

exports.column = async (req, res, next) => {
  const rows = await fetchColumn()
  res.json(rows)
}

exports.card = async (req, res, next) => {
  const rows = await fetchCard()
  res.json(rows)
}

exports.updateColumnTitle = async (req, res, next) => {
  const { title, id } = req.body
  const rows = await updateColumnTitle(title, id)
  res.json(rows)
}

exports.updateCardTitle = async (req, res, next) => {
  const { title, id } = req.body
  const rows = await updateCardTitle(title, id)
  res.json(rows)
}
