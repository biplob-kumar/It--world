const express = require('express')
const router = express.Router();


const authcontroler = require('../controler/auth-controler')


router.route('/').get(authcontroler.home)

router.route('/register').post(authcontroler.register)

router.route('/login').post(authcontroler.login)

module.exports = router