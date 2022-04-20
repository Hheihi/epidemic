import CommonAPI from '../api/common-api'

/**
 *
 */
class LeaveApi extends CommonAPI {
  static async getLeaveInfoById (params) {
    return this.post('/select/getLeaveInfoById', params)
  }
  static async insertLeaveInfo (params) {
    return this.post('/insert/insertLeaveInfo', params)
  }
  static async teaGetAllLeaveInfo (params) {
    return this.post('/select/teaGetAllLeaveInfo', params)
  }
  static async agereeLeave (params) {
    return this.post('/agree/agereeLeave', params)
  }
  static async disAgreeLeave (params) {
    return this.post('/disAgree/disAgreeLeave', params)
  }
}
export default LeaveApi