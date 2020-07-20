var express = require('express')
var router = express.Router()
const { column, card, updateColumnName } = require('./controller.js')

// render pug
router.get('/', function (req, res, next) {
  res.render('index')
})

// 컬럼 데이터 조회 api
router.get('/column', column)

// 카드 데이터 조회 api
router.get('/card', card)

// 컬럼 데이터 수정 api
router.put('/column', updateColumnName)

module.exports = router
