const { fetchColumn, fetchCard } = require('./model')

exports.column = async (req, res, next) => {
  const rows = await fetchColumn()
  res.json(rows)
}

exports.card = async (req, res, next) => {
  const rows = await fetchCard()
  res.json(rows)
}
