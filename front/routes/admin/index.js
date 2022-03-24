//관리자페이지 미들웨어
const express = require('express')
const router = express.Router()

router.use('/login',(req,res)=>{
    res.render('./admin/login')
})

router.use('/board', (req,res)=>{
    res.render('./admin/board_list')
})

router.use('/user', (req,res)=>{
    res.render('./admin/user_list')
})

router.use('/category', (req,res)=>{
    res.render('./admin/category')
})

router.use('/stats', (req,res)=>{
    res.render('./admin/stats')
})

router.use('/notice', (req,res)=>{
    res.render('./board/notice')
})

router.use('/userupdate', (req,res)=>{

    res.render('./admin/user_update')
})


module.exports = router