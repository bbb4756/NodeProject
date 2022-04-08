//라우터

const express = require('express')
const router = express.Router()
const userRouter = require('./user/index')
const boardRouter = require('./board/index')
const adminRouter = require('./admin/index')
const { Auth } = require('../middlewares/auth.js')
const matchingRouter = require('./matching/index')

router.use('/user',userRouter)
router.use('/board', boardRouter)
router.use('/admin',adminRouter)
router.use('/matching',matchingRouter)
router.use('/thismonth', (req,res)=>{
    res.render('etc/this_month.html')
})
router.use('/intro', (req,res)=>{
    res.render('etc/introduce.html')
})
module.exports = router