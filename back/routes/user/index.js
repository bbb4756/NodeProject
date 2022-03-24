const express = require('express')
const router = express.Router()
const userController = require('./user.controller')


router.post('/join',userController.join)
router.post('/login',userController.login)
router.post('/update',userController.update)
router.post('/profile',userController.profile)
router.post('/delete',userController.delete)
router.post('/logout',userController.logout)


module.exports = router