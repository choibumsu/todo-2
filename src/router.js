var express = require('express')
var router = express.Router()
const {
  getAllColumnsController,
  getAllCardsController,
  updateColumnNameController,
  updateCardNameController,
} = require('./controller.js')

// render pug
router.get('/', function (req, res, next) {
  res.render('index')
})

// 컬럼 데이터 조회 api
router.get('/column', getAllColumnsController)

// 카드 데이터 조회 api
router.get('/card', getAllCardsController)

// 컬럼 데이터 수정 api
router.put('/column', updateColumnNameController)

// 카드 데이터 수정 api
router.put('/card',updateCardNameController)

module.exports = router
