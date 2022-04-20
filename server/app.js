global.env = require('../env.config') // 配置项置入global
const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const cors = require('cors')
const expressJwt = require('express-jwt')
const path = require("path")
app.use('/server/uploads', express.static(path.join(__dirname, './uploads')))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(expressJwt({
    secret: 'bendan',
    algorithms: ['HS256'],
}).unless({ path: ['/api/login'] }))
// app.use(express.static("public"))
// parse application/json

app.use(bodyParser.json())
app.use(cors()) //跨域
//配置session 存储到mongodb

// app.use(function(err, req, res) {
//     if (err && err.message === 'No authorization token was found') return res.send({ message: "没有token", code: 1 });
//     if (err && err.message === 'jwt expired') return res.send({ message: "token过期", code: 1 });
//     if (err && err.message === 'invalid signature') return res.send({ message: "token错误", code: 1 });
//     if (err) return res.send({ message: "token验证失败", code: 1 });
// })
app.use('/api', ...require('./routes/index'))

app.listen(3000, () => {
    console.log('3000端口监听中');
})