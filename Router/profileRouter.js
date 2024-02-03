const express = require('express')
const router = express.Router()
const {getOneProfile,getAllProfile,editProfile}= require('../Controller/ProfilrController');

router.route('/').get(getAllProfile).post()
router.route('/:id').get(getOneProfile).patch(editProfile).delete()

module.exports = router