import server from '@/services/server'

/**
 * Api公共方法
 * @function this.get() get请求
 * @function this.post() post请求
 * @function this.put() put请求
 * @function this.remove() delete请求
 */
class Common {
    /**
     * Get请求
     * @param {String} url 接口地址
     * @param {Object} params 请求参数
     * @param {Object} headers 请求头
     */
    static async get(url, params, headers) {
        const options = {
            method: 'GET',
            headers
        }

        return await server(url, params, options)
    }

    /**
     * Post请求
     * @param {String} url 接口地址
     * @param {Object} body 请求参数
     * @param {Object} headers 请求头
     */
    static async post(url, body, headers) {
        const options = {
            method: 'POST',
            headers
        }

        return await server(url, body, options)
    }

    /**
     * Put请求
     * @param {String} url 接口地址
     * @param {Object} body 请求参数
     * @param {Object} headers 请求头
     */
    static async put(url, body, headers) {
        const options = {
            method: 'PUT',
            headers
        }

        return await server(url, body, options)
    }

    /**
     * Delete请求
     * @param {String} url 接口地址
     * @param {Object} body 请求参数
     * @param {Object} headers 请求头
     */
    static async remove(url, body, headers) {
        const options = {
            method: 'DELETE',
            headers
        }

        return await server(url, body, options)
    }
}

export default Common