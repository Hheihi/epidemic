import CommonApi from '@/api/common-api'

/**
 * 资源类接口
 * @function getResourceList 获取图片资源列表
 * @function uploadFile 上传文件
 */
class ResourceApi extends CommonApi {
    /**
     * 获取产品列表
     * @params params 筛选参数
     * @returns response
     */
    static async getResourceList (params) {
        return await this.get('/resource', params)
    }

    /**
     * 上传文件
     * @param { File } file 文件
     * @param { String } name 文件参数名称
     * @returns response
     */
    static async uploadFile (params) {
        // const headers = {
        //     'Content-Type': 'multipart/form-data'
        // }
        return await this.post('/upload/file', params)
    }

    /**
     * 删除资源
     * @param id 筛选参数
     * @param name 文件名
     * @returns response
     */
    static async deleteFile (id, name) {
        return await this.remove('/resource', { id, name })
    }

    static async teaExcelUpload (params) {
        return await this.post('/teaUploadExcel', params)
    }
    static async stuExcelUpload (params) {
        return await this.post('/stuUploadExcel', params)
    }

    static async saveUploadFile (params) {
        return await this.post('/saveUploadFile', params)
    }
}

export default ResourceApi