const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send("32112")
})
app.listen(3000, () => {
    console.log('3000端口监听中');
})