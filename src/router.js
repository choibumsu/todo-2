var express = require('express')
var router = express.Router()
const { test } = require('./controller.js')

// render pug
router.get('/', function (req, res, next) {
  res.render('index')
})

// api
router.get('/test', function (req, res, next) {
  test(req, res, next)
})

module.exports = router
