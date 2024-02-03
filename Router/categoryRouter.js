const express = require('express')
const router = express.Router()

const {newCategory,allCategory}= require('../Controller/categoryController')

router.route('/').get(allCategory).post(newCategory)
router.route('/:id').patch().delete()

module.exports = router