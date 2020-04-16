var express = require('express')
var router = express.Router()
var User = require('../controllers/User')

/*
 * CRRUD for User
 */
router.get('/', User.getAll)
router.get('/:id', User.getOne)
router.post('/', User.create)
router.put('/:id', User.update)
router.delete('/:id', User.delete)

module.exports = router
