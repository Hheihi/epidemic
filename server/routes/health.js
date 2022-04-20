const MySql = require('../utils/db')
const express = require('express')
const route = express.Router()


async function selectHealthInfoById (req, res) {
  const { sid, page, size } = req.body
  let sql = `
  SELECT COUNT(id) as total 
    FROM 
      health
    WHERE sid = ${sid};
  SELECT health.id,userinfo.name,userinfo.class_info,fever,leaveSchool,acid,virus,mask,create_time,health_img 
		FROM 
      health,userinfo 
		WHERE 
      health.sid = userinfo.sid
		AND 
      health.sid = ${sid}			
    LIMIT ${(+page - 1) * +size},${+size}

  `
  const { status, data } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: data[1], total: data[0][0].total, msg: "success" })
  }

}

async function insertHealthInfo (req, res) {
  const { sid, fever, leaveSchool, acid, virus, mask, date, healthImg } = req.body
  let sql = `
  INSERT INTO health 
  (sid,fever,leaveSchool,acid,virus,mask,create_time,health_img)
   VALUES 
   (
    ${sid},
    ${fever},
    ${leaveSchool},
    ${acid},
    ${virus},
    ${mask},
    '${date}',
    '${healthImg}'
   )
  `
  const { status } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: null, msg: "上报成功" })
  }

}
async function teaSelectHealthInfo (req, res) {
  const { sid, page, size, fever, username, acid } = req.body
  let feverFilter = ''
  let nameFilter = ''
  let acidFilter = ''
  if (fever) {
    feverFilter = `AND  fever = ${fever}`
  }
  if (username) {
    nameFilter = `AND  userinfo.name = '${username}'`
  }
  if (acid) {
    acidFilter = `AND  health.acid = ${acid}`
  }
  let sql = `
  SELECT COUNT(*) AS total FROM 
      (SELECT health.id,health.sid,health.fever,health.leaveSchool,health.acid,health.virus,health.mask,health.create_time FROM health ,(
      SELECT userinfo.sid 
      FROM 
      userinfo ,(SELECT grade_id,college_id,major_id FROM userinfo WHERE sid = '${sid}') AS Tea
      WHERE 
      userinfo.grade_id = Tea.grade_id 
      AND
      userinfo.college_id = Tea.college_id
      AND
      userinfo.major_id =Tea.major_id
      ${nameFilter}
      ) AS Stu
      WHERE health.sid = Stu.sid ${feverFilter} ${acidFilter}) AS T;
 SELECT Stu.name,Stu.class_info,health.id,health.sid,health.fever,health.leaveSchool,health.acid,health.virus,health.mask,health.create_time,health.health_img FROM health ,(
      SELECT name,class_info,userinfo.sid 
      FROM 
      userinfo ,(SELECT grade_id,college_id,major_id FROM userinfo WHERE sid = '${sid}') AS Tea
      WHERE 
      userinfo.grade_id = Tea.grade_id 
      AND
      userinfo.college_id = Tea.college_id
      AND
      userinfo.major_id =Tea.major_id
      ${nameFilter}
      ) AS Stu
      WHERE health.sid = Stu.sid ${feverFilter} ${acidFilter}
     LIMIT ${(+page - 1) * +size},${+size}

  `

  const { status, data } = await MySql.query(sql)
  if (status) {
    res.fail()
  } else {
    res.send({ code: 200, data: data[1], total: data[0][0].total, msg: "success" })

  }
}
route.post('/select/teaSelectHealthInfo', teaSelectHealthInfo)
route.post('/select/selectHealthInfoById', selectHealthInfoById)
route.post('/insert/insertHealthInfo', insertHealthInfo)
module.exports = route