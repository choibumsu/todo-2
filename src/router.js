var express = require('express')
var router = express.Router()
const {
  getAllColumnsController,
  getAllCardsController,
  updateColumnNameController,
  updateCardNameController,
  createCardController,
  deleteCardController,
  moveCardController,
} = require('./controller.js')

// render pug
router.get('/', function (req, res, next) {
  res.render('index')
})

// 컬럼 데이터 조회 api
router.get('/api/column', getAllColumnsController)

// 카드 데이터 조회 api
router.get('/api/card', getAllCardsController)

// 컬럼 데이터 수정 api
router.put('/api/column', updateColumnNameController)

// 카드 데이터 수정 api
router.put('/api/card', updateCardNameController)

// 카드 데이터 삭제 api
router.delete('/api/card', deleteCardController)

//카드 추가 api
router.post('/api/card', function (req, res, next) {
  createCardController(req, res, next)
})

//카드 추가 api
router.put('/api/card/move', function (req, res, next) {
  moveCardController(req, res, next)
})

module.exports = router
