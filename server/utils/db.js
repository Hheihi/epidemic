const mysql = require('mysql')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'epidemic',
    timezone: '+08:00' ,//东八时区
        // timezone: 'local',
    multipleStatements: true
})

/**
 *
 * 自己封装的数据模型的基类
 * 封装了数据库操作
 */
module.exports = class Model {

    /**
     * 通用查询方法
     * @param {string} sql 要执行的SQL语句
     * @param {Array} params 给SQL语句的占位符进行赋值的参数数组
     */
    // static query(sql, params) {
    //     return new Promise((resolve, reject) => {
    //         pool.getConnection(function(err, connection) {
    //             if (err) {
    //                 console.error(err)
    //                 connection.release()
    //             } else {
    //                 //query执行sql语句
    //                 connection.query(sql, params, (err, results) => {
    //                     //在外部用catch截取
    //                     if (err) {
    //                         console.error(err)
    //                         reject(err)
    //                     } else {
    //                         resolve(results)
    //                     }
    //                     // 结束会话 释放链接
    //                     connection.release()
    //                 })
    //             }
    //         })
    //     })
    // }
    static query (sql) {
        return new Promise(resolve => {
            // 从连接池中获取一个连接
            pool.getConnection((err, connection) => {
                // if (!isNil(err)) {
                //     // 获取连接失败
                //     return resolve({ status: 1, data: null, err })
                // }
                // 获取成功，开始查询
                connection.query(sql, function (err, rows) {

                    // 查询结束,释放连接
                    connection.release()

                    // // 查询报错
                    // if (!isNil(err)) {
                    //     // mysql查询错误信息
                    //     if (
                    //         includes(mode, parseInt(err.sqlState)) ||
                    //         includes(mode, String(err.sqlState))
                    //     ) {
                    //         // 其他处理，比如排除索引冲突，需要做异常反馈
                    //         return resolve({ status: err.sqlState, data: null, err })
                    //     }
                    //     // 实质性错误，非异常反馈
                    //     return resolve({ status: 1, data: null, err })
                    // }
                    // 查询正常返回查询结果
                    // console.log(rows);
                    return resolve({ status: 0, data: rows, err: null })

                })
            })
        })
    }

}