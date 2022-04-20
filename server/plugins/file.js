const { readFileSync, stat, mkdir, unlink } = require('fs')
const { resolve, dirname: fsDirname } = require('path')
    /**
     * File
     * @description 文件操作类
     * @function checkDir 查看或文件是否存在
     * @function createDir 创建文件夹
     * @function cascCreateDir 级联创建文件夹
     * @function getFileToString 读取文件内容为字符串，会导致阻塞，不应该在接口使用
     */
class File {
    /**
     * @method getFileToString 读取文件内容为字符串
     * @param {String} path 相对路径
     * @returns 文件内容
     */
    static getFileToString(path) {
        return readFileSync(resolve(__dirname, path)).toString()
    }

    /**
     * @method checkDir 查看或文件是否存在
     * @param {String} path 相对路径
     * @return {Boolean} 是否存在
     */
    static checkDir(path) {
        return new Promise(resolve => {
            stat(path, err => {
                if (err) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
    }

    /**
     * @method createDir 创建文件夹
     * @param {String} dirname 相对路径+文件夹名
     * @return {Boolean} 是否创建成功
     */
    static createDir(dirname) {
        return new Promise(resolve => {
            mkdir(dirname, err => {
                if (err) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
    }

    /**
     * @method cascCreateDir 级联创建文件夹
     * @param {String} dirname 相对路径+文件夹名
     * @return {Boolean} 是否创建成功
     */
    static async cascCreateDir(dirname) {
        if (await this.checkDir(dirname)) {
            return true
        } else {
            if (await this.cascCreateDir(fsDirname(dirname))) {
                return await this.createDir(dirname)
            } else {
                return false
            }
        }
    }

    /**
     * @method deleteFile 删除文件
     * @param {String} path 文件路径
     * @return {Boolean} 是否删除成功
     */
    static async deleteFile(path) {
        return new Promise(resolve => {
            unlink(path, err => {
                if (err) {
                    return resolve(false)
                } else {
                    return resolve(true)
                }
            })
        })
    }
}

module.exports = File