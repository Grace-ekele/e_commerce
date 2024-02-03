const express = require('express')
const router = express.Router()
const {CreateUser,GetAll,UserLogin} = require('../Controller/AuthController')

 router.route('/all').get(GetAll)
 router.route('/').post(CreateUser )
 router.route('/login').post(UserLogin)
 router.route('/id').get().patch().delete()

module.exports = router