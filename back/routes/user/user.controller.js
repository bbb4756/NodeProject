//회원관리 컨트롤러
const pool = require('../../db.js').pool
const { createToken } = require('../../utils/jwt.js')

// 지운 이유 교수님이 지우라고했슴.


exports.join = (req,res)=>{
    res.send('가입완료')
}

exports.login = async (req,res)=>{
    const { userid, userpw } = req.body

    const sql = 'SELECT userid, username, nickname, level from user where userid = ? and userpw = ?'
    const param = [userid, userpw]
    
    try {
        const [result] = await pool.execute(sql, param)

        if( result.length === 0 ) {throw Error ('id/pw를 확인해주세요')}

        const jwt = createToken(result[0])

        res.cookie('token', jwt, {
            path:'/',
            httpOnly:true,
            domain:'localhost'
        })

        const response = {
            result,
            errno:0
        }
        res.json(response)

    }
    catch (e) {
        console.log(e.message)
        const response = {
            result:[],
            errno:1
        }
        res.json(response)
    }
}

exports.profile = async (req,res)=>{
    // const {userid,username,userimg,nickname,address,gender,phone,mobile,email,userintro} = req.body
    // console.log('hello')
    console.log(req.user)
    const {userid} = req.user
    const sql = 'SELECT userid,username,userimg,nickname,address,gender,phone,mobile,email,userintro from user where userid=?'
    const param = [userid]
    console.log(param)
    try {
        const [result] = await pool.execute(sql,param)
        response = {
            result,
            errno:0
        }
        
        res.json(response)
    } catch(e){
        console.log(e.message)
        response = {
            errno:1
        }
        res.json(response)
    }
    
}


exports.update = async (req,res)=>{
    
    const {userid, userpw,userimg,nickname,address,phone,mobile} = req.body

    const sql ="UPDATE user SET userpw=?, userimg=?, nickname=?, address=?, phone=?, mobile=? WHERE userid=?"
    const param = [userpw,userimg,nickname,address,phone,mobile,userid]
    try{
        const [result] = await pool.execute(sql,param)
        console.log(result)
        const response = {
            result,
            errno:0
        }
        
        res.json(response)

    } catch (e) {
        console.log(e.message)
        const response = {
            result:[],
            errno:1
        }
        res.json(response)
    }

}
