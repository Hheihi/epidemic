const MySql = require('../utils/db')
const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken')

async function login (req, res) {
    const { name, pwd, type } = req.body
    let sql = `SELECT * FROM userinfo WHERE sid = '${name}' AND pwd = '${pwd}' AND identity = ${type}`;
    console.log(sql);
    const { status, data } = await MySql.query(sql)
    if (status) {
        res.send({ code: 403, data: null, msg: '用户名或者密码错误' })
    } else {
        //登录成功
        const userInfo = {
            sid: data[0].sid,
            name: data[0].name,
            type: data[0].identity
        }
        const token = 'Bearer ' + jwt.sign(userInfo, 'bendan', { expiresIn: 1000 * 60 * 60 })
        return res.send({ code: 200, data: data[0], token: token })
    }
}

route.post('/login', login)

module.exports = route