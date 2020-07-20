var express = require('express')
var router = express.Router()
const { column, card } = require('./controller.js')

// render pug
router.get('/', function (req, res, next) {
  res.render('index')
})

// 컬럼 데이터 조회 api
router.get('/column', column)

// 카드 데이터 조회 api
router.get('/card', card)

module.exports = router
