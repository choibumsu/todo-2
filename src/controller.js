const { fetchTest } = require('./model')

exports.test = async (req, res, next) => {
  const rows = await fetchTest()
  res.json(rows)
}
