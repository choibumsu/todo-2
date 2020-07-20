const { fetchTest } = require('./model')

exports.test = async (req, res, next) => {
  const rows = await fetchTest()
  console.log(rows)
  res.json(rows)
}
