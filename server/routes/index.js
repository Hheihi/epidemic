const user = require('./user')
const login = require('./login')
const resource = require('./resource')
const notice = require('./notice')
const health = require('./health')
const leave = require('./leave')
module.exports = [
    user,
    login,
    resource,
    notice,
    health,
    leave
]