import CommonAPI from '../api/common-api'

/**
 * 登录相关api
 * @function getUserInfo 登录
 * @function getStudentsInfo 管理员获取学生信息
 * @function getTeachersInfo 管理员获取教师信息
 * @function selectAllCollege 查询所有学院信息
 * @function selectMajorByCollegeId 根据学院id查找学院所有专业
 * @function updateStuInfoBySid 根据学生id 修改学生信息
 */
class UserInfoApi extends CommonAPI {
    /**
     * 登录
     * @returns response
     */
    static async getUserInfo (params) {
        return await this.post('/user_info', params)
    }

    static async getStudentsInfo (params) {
        return await this.post('/manage/stu', params)
    }
    static async getTeachersInfo (params) {
        return await this.post('/manage/tea', params)
    }
    static async selectAllCollege () {
        return await this.post('/select/selectAllCollege')
    }
    static async selectMajorByCollegeId (params) {
        return await this.post('/select/selectMajorByCollegeId', params)
    }
    static async updateUserInfoBySid (params) {
        return await this.post('/update/updateUserInfoBySid', params)
    }
    static async deleteUserBySid (params) {
        return await this.post('/delete/deleteUserBySid', params)
    }
}
export default UserInfoApi