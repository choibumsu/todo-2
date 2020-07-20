const { fetchColumn, fetchCard, updateColumnName } = require('./model')

exports.column = async (req, res, next) => {
  const rows = await fetchColumn()
  res.json(rows)
}

exports.card = async (req, res, next) => {
  const rows = await fetchCard()
  res.json(rows)
}

exports.updateColumnName = async (req, res, next) => {
  const { title, id } = req.body
  const rows = await updateColumnName(title, id)
  res.json(rows)
}
