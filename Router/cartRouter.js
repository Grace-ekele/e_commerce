const express = require('express')

const router = express.Router()

const {addToCart,removeFromCart} = require('../Controller/cartcontoller')

router.route('/').get()
router.route('/:id/:productid').post(addToCart)
router.route('/:id/:productid').delete(removeFromCart)


module.exports = router