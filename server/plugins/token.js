const jwt = require('jsonwebtoken')
    /**
     * token 签名加解密
     * @function encrypt 加密方法
     * @function decrypt 解密方法
     */
class Token {
    /**
     * encrypt
     * @param {Object} data 需要加密的数据
     * @param {Strng} secret 密钥
     * @param {Number} time 有效时间
     * @returns {String} 密文
     */
    static encrypt(data, secret, time) {
        // data加密数据，time过期时间
        return jwt.sign(data, secret, { expiresIn: time })
    }

    /**
     * decrypt
     * @param {String} token 密文
     * @param {Strng} secret 密钥
     * @returns {*} 明文数据
     */
    static decrypt(token, secret) {
        return new Promise(resolve => {
            jwt.verify(token, secret, (err, data) => {
                if (err) {
                    return resolve({ state: false, data: null, err })
                } else {
                    return resolve({ state: true, data, err: null })
                }
            })
        })
    }
}

module.exports = Token