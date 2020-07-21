const { fetchColumn, fetchCard, updateColumnName } = require('./model')

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

exports.updateColumnName = async (req, res, next) => {
  const { title, id } = req.body
  const rows = await updateColumnName(title, id)
  res.json(rows)
}
