const express = require('express')

const router = express.Router()

const {addToCart} = require('../Controller/cartcontoller')

router.route('/').get()
router.route('/:id/:productid').post(addToCart)


module.exports = router