import CommonAPI from '../api/common-api'

/**
 * 登录相关api
 * @function login 登录
 */
class LoginApi extends CommonAPI {
    /**
     * 登录
     * @returns response
     */
    static async login(params) {
        return await this.post('/login', params)
    }

}
export default LoginApi