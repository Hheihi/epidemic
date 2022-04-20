import CommonAPI from '../api/common-api'

/**
 *
 */
class HealthApi extends CommonAPI {
  static async selectHealthInfoById (params) {
    return this.post('/select/selectHealthInfoById', params)
  }
  static async insertHealthInfo (params) {
    return this.post('/insert/insertHealthInfo', params)
  }

  static async teaSelectHealthInfo (params) {
    return this.post('/select/teaSelectHealthInfo', params)
  }
}
export default HealthApi