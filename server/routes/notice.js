const MySql = require('../utils/db')
const express = require('express')
const route = express.Router()
async function selectAllNotice (req, res) {
  const { page, size } = req.body
  let sql = `
  SELECT COUNT(id) as total from notice;
  SELECT notice.id,create_time,theme,content,notice_id,college.college,grade.grade,major.major FROM notice
		LEFT JOIN college 
		ON college.id = notice.college_id
		LEFT JOIN grade
		ON grade.id = notice.grade_id
		LEFT JOIN major
		ON major.id = notice.major_id
    LIMIT ${(+page - 1) * +size},${+size};
  `
  const { status, data } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: data[1], total: data[0][0].total, msg: "success" })
  }

}

async function deleteNoticeById (req, res) {
  const { id } = req.body
  let sql = `
  		DELETE from notice WHERE id = ${id}
  `
  const { status } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: null, msg: "删除成功" })
  }
}
async function selectAllGrade (req, res) {
  let sql = ` 			
		SELECT id ,grade FROM grade
  `
  const { status, data } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: data, msg: "success" })
  }
}

async function insertNotice (req, res) {
  const { date, theme, content, collegeId, gradeId, majorId, tId } = req.body
  let sql = `
    	INSERT INTO 
		    notice 
		      (create_time,theme,content,college_id,grade_id,major_id,t_id) 
		    VALUES 
		      (
		      '${date}',
		      '${theme}',
		      '${content}',
		      ${collegeId},
		      ${gradeId},
		      ${majorId},
          ${tId}
		      )
  `
  const { status, data } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: data, msg: "发送成功" })
  }
}

async function selectNoticeById (req, res) {
  const { sid, page, size } = req.body
  let sql = `
  			
	SELECT COUNT(notice.id) AS total from notice,userinfo WHERE
				notice.grade_id = userinfo.grade_id 
				AND
				notice.college_id = userinfo.college_id
				AND
				notice.major_id = userinfo.major_id
				AND sid = ${sid};
										
  SELECT notice.id,create_time,theme,content from notice,userinfo
		WHERE
		  notice.grade_id = userinfo.grade_id 
		AND
		  notice.college_id = userinfo.college_id
		AND
		  notice.major_id = userinfo.major_id
		AND sid = ${sid}			
    LIMIT ${(+page - 1) * +size},${+size}

  `
  const { status, data } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: data[1], total: data[0][0].total, msg: "success" })
  }
}
route.post('/select/selectAllNotice', selectAllNotice)
route.post('/delete/deleteNoticeById', deleteNoticeById)
route.post('/select/selectAllGrade', selectAllGrade)
route.post('/insert/insertNotice', insertNotice)
route.post('/select/selectNoticeById', selectNoticeById)
module.exports = route