const { fetchColumn, fetchCard } = require('./model')

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
