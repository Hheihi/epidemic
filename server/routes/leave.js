const MySql = require('../utils/db')
const express = require('express')
const route = express.Router()

async function getLeaveInfoById (req, res) {
  const { sid, page, size } = req.body
  let sql = ` 
SELECT COUNT(id) 
	 AS 
	 total 
	FROM 
	 leaveInfo
	WHERE 
	 s_id = ${sid};
SELECT * 
	FROM 
	leaveInfo
	WHERE 
	 s_id = ${sid}
  LIMIT ${(+page - 1) * +size},${+size}
 `

  const { status, data } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: data[1], total: data[0][0].total, msg: "success" })
  }

}
async function insertLeaveInfo (req, res) {
  const { sid, create_time, start_time, end_time, reson } = req.body
  let sql = `
  	INSERT INTO 
      leaveInfo 
    (s_id,create_time,start_time,end_time,reson,result) 
	    VALUES 
      (${sid},
      '${create_time}',
      '${start_time}',
      '${end_time}',
      '${reson}',3)
  `
  const { status } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: null, msg: "申请成功" })
  }
}

async function teaGetAllLeaveInfo (req, res) {
  const { sid, page, size, result, username } = req.body
  let resFilter = ''
  let nameFilter = ''
  if (result) {
    resFilter = `AND result  = ${result}`
  }
  if (username) {
    nameFilter = `AND userinfo.name = '${username}'`
  }
  let sql = ` 
  		SELECT COUNT(id) AS total FROM
			(SELECT * FROM 
				leaveInfo, 
				(SELECT sid,name from userinfo, (SELECT grade_id,college_id,major_id FROM userinfo WHERE sid = ${sid})
			AS teacherInfo
				WHERE
			userinfo.grade_id = teacherInfo.grade_id
				AND
			userinfo.college_id = teacherInfo.college_id
				AND
			userinfo.major_id = teacherInfo.major_id
      ${nameFilter}
      )
			AS Sid
				WHERE
			leaveInfo.s_id =  Sid.sid ${resFilter}) AS T;

      SELECT * FROM
				leaveInfo,
				(SELECT sid,name from userinfo, (SELECT grade_id,college_id,major_id FROM userinfo WHERE sid = ${sid}) 
			AS teacherInfo 
				WHERE 
			userinfo.grade_id = teacherInfo.grade_id 
				AND
			userinfo.college_id = teacherInfo.college_id
				AND
			userinfo.major_id = teacherInfo.major_id
      ${nameFilter}
      )
			AS Sid 
				WHERE 
			leaveInfo.s_id =  Sid.sid ${resFilter}
      LIMIT ${(+page - 1) * +size},${+size}
  `
  console.log(sql);
  const { status, data } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: data[1], total: data[0][0].total, msg: "success" })
  }
}

async function agereeLeave (req, res) {
  const { id } = req.body
  let sql = `
  	UPDATE leaveInfo SET result = 1 WHERE id = ${id}
  `
  const { status } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: null, msg: "同意成功" })
  }
}
async function disAgreeLeave (req, res) {
  const { id } = req.body
  let sql = `
  	UPDATE leaveInfo SET result = 2 WHERE id = ${id}
  `
  const { status } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: null, msg: "拒接成功" })
  }
}
route.post('/select/getLeaveInfoById', getLeaveInfoById)
route.post('/insert/insertLeaveInfo', insertLeaveInfo)
route.post('/select/teaGetAllLeaveInfo', teaGetAllLeaveInfo)
route.post('/agree/agereeLeave', agereeLeave)
route.post('/disAgree/disAgreeLeave', disAgreeLeave)
module.exports = route