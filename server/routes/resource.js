const Express = require('express')
const File = require('../plugins/file')
const upload = require('../plugins/uploader')
// const Mysql = require('../utils/db')
const MySql = require('../utils/db')
const xlsx = require('node-xlsx')
const Router = Express.Router()
const path = require('path')
const { basePath } = global.env
// 获取资源列表
async function getResource (req, res) {
  const { id, page, size } = req.query
  const filter = `
    WHERE user_id=${id}
  `
  const sql =
    `
    SELECT COUNT(*) AS total FROM resources ${filter};
    SELECT * FROM resources a JOIN (
      SELECT id FROM resources
      ${filter}
      ORDER BY create_time DESC
       LIMIT ${(+page - 1) * +size},${+size}
      ) b ON a.id=b.id;
      `
  // LIMIT ${page * 12 - 12}, 12
  // mysql.query(sql).then((result) => {
  //   res.send({ code: 200, data: result, msg: "success" })
  // })
  const { status, data } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: data[1], total: data[0][0].total, msg: "success" })
  }
}

// 上传文件
async function uploadFile (req, res) {
  const file = req.file
  //  console.log(req.session);
  //  const sid = req.session.sid
  const media = file.mimetype.split('/')[0] === 'image' ? 'picture' : 'video'
  //  const sql =
  //   `
  //     UPDATE userinfo SET avater='/server/uploads/file/${file.filename}' WHERE sid ='${sid}';
  //     INSERT INTO resources(user_id,media,url,file_name,origin_name,size,create_time)
  //     VALUES(
  //       '${sid}',
  //       '${media}',
  //       '/server/uploads/file/${file.filename}',
  //       '${file.filename}',
  //       '${file.originalname}',
  //       ${file.size},
  //       '${new Date().getTime()}')
  //     `

  // const { status } = await MySql.query(sql)
  // if (status) {
  //   res.fail()
  // } else {
  //   res.send({ code: 200, data: file.filename, msg: "success" })
  // }
  res.send({ code: 200, data: { media: media, fileName: file.filename, originName: file.originalname, size: file.size, imgUrl: `/server/uploads/file/${file.filename}` }, msg: "success" })

}
// 保存上传文件到用户
async function saveUploadFile (req, res) {
  const { imgUrl, sid, media, fileName, originName, size } = req.body
  const sql =
    `
      UPDATE userinfo SET avater='${imgUrl}' WHERE sid ='${sid}';
      INSERT INTO resources(user_id,media,url,file_name,origin_name,size,create_time)
      VALUES(
        '${sid}',
        '${media}',
        '${imgUrl}',
        '${fileName}',
        '${originName}',
        ${size},
        '${new Date().getTime()}')
      `
  console.log(sql);
  const { status } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: null, msg: "success" })
  }
}

// 删除文件
async function deleteResource (req, res) {
  const { id, name } = req.body
  const sql = `
    DELETE FROM resources
    WHERE id=${(id)};
  `
  const { status } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: null, msg: "success" })
  }
  //删除文件
  File.deleteFile(basePath + '/uploads/file/' + name)
  // res.send({ code: 200, msg: "success", data: null })
}

async function teaExcelUpload (req, res) {
  let file = req.file
  // const data = xlsx.parse(`../uploads/file/${file.filename}`)
  // console.log(path.resolve('server/uploads/file/file1647277199889.xlsx'));
  let filePath = path.resolve(`server/uploads/file/${file.filename}`)
  let fileData = xlsx.parse(filePath)
  // console.log(fileData[0].data);
  let arr = []
  fileData[0].data.map(item => {
    item[2] === '男' ? item[2] = 1 : item[2] = 2
    // item.map(childitem=>{
    //   childitem
    //   arr.push(`${item[0]},${item[1]},${item[2]},${item[3]},`)
    // })
    item[5] = `(SELECT id FROM grade  WHERE grade ='${item[5]}')`
    item[6] = `(SELECT id FROM college  WHERE college ='${item[6]}')`
    item[7] = `(SELECT id FROM major  WHERE major ='${item[7]}')`
    arr.push(`(${item[0]},${item[1]},${item[2]},${item[3]},${item[4]},${item[5]},${item[6]},${item[7]},'${item[8]}','${item[9]}',2,${item[10]})`)
  })
  arr.shift(0)
  let sql = `INSERT INTO userinfo(name, sid, sex, age, pwd, grade_id, college_id, major_id, class_info, source, identity, phone) VALUES ${arr}`
  // console.log(sql);
  const { status } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: null, msg: "success" })
  }
}
async function stuExcelUpload (req, res) {
  let file = req.file
  // const data = xlsx.parse(`../uploads/file/${file.filename}`)
  // console.log(path.resolve('server/uploads/file/file1647277199889.xlsx'));
  let filePath = path.resolve(`server/uploads/file/${file.filename}`)
  let fileData = xlsx.parse(filePath)
  // console.log(fileData[0].data);
  let arr = []
  fileData[0].data.map(item => {
    item[2] === '男' ? item[2] = 1 : item[2] = 2
    // item.map(childitem=>{
    //   childitem
    //   arr.push(`${item[0]},${item[1]},${item[2]},${item[3]},`)
    // })
    item[5] = `(SELECT id FROM grade  WHERE grade ='${item[5]}')`
    item[6] = `(SELECT id FROM college  WHERE college ='${item[6]}')`
    item[7] = `(SELECT id FROM major  WHERE major ='${item[7]}')`
    arr.push(`(${item[0]},${item[1]},${item[2]},${item[3]},${item[4]},${item[5]},${item[6]},${item[7]},'${item[8]}','${item[9]}',1,${item[10]})`)
  })
  arr.shift(0)
  let sql = `INSERT INTO userinfo(name, sid, sex, age, pwd, grade_id, college_id, major_id, class_info, source, identity, phone) VALUES ${arr}`
  // console.log(sql);
  const { status } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: null, msg: "success" })
  }
}
Router.get('/resource', getResource)
Router.post('/upload/file', upload.single('file'), uploadFile)
Router.delete('/resource', deleteResource)
Router.post('/teaUploadExcel', upload.single('file'), teaExcelUpload)
Router.post('/stuUploadExcel', upload.single('file'), stuExcelUpload)
Router.post('/saveUploadFile', saveUploadFile)
module.exports = Router