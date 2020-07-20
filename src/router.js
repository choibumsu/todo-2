var express = require('express')
var router = express.Router()
const { column } = require('./controller.js')

// render pug
router.get('/', function (req, res, next) {
  res.render('index')
})

// 컬럼 데이터 조회 api
router.get('/column', column)

module.exports = router
