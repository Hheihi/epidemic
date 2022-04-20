import CommonAPI from '../api/common-api'
class NoticeApi extends CommonAPI {
  static async selectAllNotice (params) {
    return this.post('/select/selectAllNotice', params)
  }
  static async deleteNoticeById (params) {
    return this.post('/delete/deleteNoticeById', params)
  }
  static async selectAllGrade () {
    return this.post('/select/selectAllGrade')
  }
  static async insertNotice (params) {
    return this.post('/insert/insertNotice', params)
  }
  static async selectNoticeById (params) {
    return this.post('/select/selectNoticeById', params)
  }
}

export default NoticeApi