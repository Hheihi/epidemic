const multer = require('multer') // 上传文件使用
const path = require('path')
    //使用multer生成仓库信息
const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            //存储文件的位置
            cb(null, `./server/uploads/${file.fieldname}`)
        },
        filename: function(req, file, cb) {
            console.log(file);
            // 从file信息中把后缀名拿出来
            const tmp = path.extname(file.originalname)
            cb(null, file.fieldname + Date.now() + tmp)
        }
    })
    //配置接收器带有仓库信息
const upload = multer({ storage: storage })

module.exports = upload