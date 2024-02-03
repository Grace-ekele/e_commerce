const express = require('express')
const router = express.Router()

const {Product,getAllProduct}= require('../Controller/productController')

router.route('/').get(getAllProduct)
router.route('/:id/:catId').post(Product)

module.exports = router