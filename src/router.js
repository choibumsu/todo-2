var express = require('express')
var router = express.Router()
const {
  getAllColumnsController,
  createColumnController,
  getAllCardsController,
  updateColumnNameController,
  updateCardNameController,
  createCardController,
  deleteCardController,
  moveCardController,
  getAllActivityController,
  updateNextCardIdController,
} = require('./controller.js')

// render pug
router.get('/', function (req, res, next) {
  res.render('index')
})

// 컬럼 데이터 조회 api
router.get('/api/column', getAllColumnsController)

// 컬럼 데이터 추가 api
router.post('/api/column', createColumnController)

// 컬럼 데이터 수정 api
router.put('/api/column', updateColumnNameController)

// 카드 데이터 조회 api
router.get('/api/card', getAllCardsController)

// 카드 데이터 수정 api
router.put('/api/card', updateCardNameController)

// 카드 데이터 삭제 api
router.delete('/api/card', deleteCardController)

// 카드 추가 api
router.post('/api/card', createCardController)

// 카드 이동 api
router.put('/api/card/move', moveCardController)

// 카드 next_card_id set api
router.put('/api/card/next_card_id', updateNextCardIdController)

//액티비티 테이블 조회 api
router.get('/api/activity', getAllActivityController)

module.exports = router
