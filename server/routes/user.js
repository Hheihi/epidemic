const MySql = require('../utils/db')
const express = require('express')
const route = express.Router()
/**
 * @function getUserList 根据id获取用户信息
 * 
 * @function getNotice 获取当前登录用户的所有通知
 * */

async function getUserInfo (req, res) {
    const { id } = req.body
    let sql = `SELECT userinfo.id,name,sid,sex,age,class_info,source,identity,phone,college,grade,major,avater
    FROM userinfo 
    LEFT JOIN college ON userinfo.college_id = college.id
    LEFT JOIN grade ON userinfo.grade_id = grade.id 
    LEFT JOIN major ON  userinfo.major_id = major.id 
    WHERE sid = ${id}`;
    const { status, data } = await MySql.query(sql)
    if (status) {
        res.fail()
    } else {
        res.send({ code: 200, data: data, msg: "success" })
    }
}

async function manageStudent (req, res) {
    const { page, size } = req.body
    let sql = `
        SELECT count(sid) as total FROM userinfo WHERE identity =1;
        SELECT sid,name,sex,pwd,age,class_info,source,phone,grade.id as gradeId,grade.grade,college.id as collegeId,college.college,major.id as majorId, major.major
        FROM userinfo 
        LEFT JOIN grade 
        ON userinfo.grade_id = grade.id 
        LEFT JOIN college
        ON userinfo.college_id = college.id
        LEFT JOIN major
        ON userinfo.major_id = major.id
        WHERE userinfo.identity =1
        LIMIT ${(+page - 1) * +size},${+size};
        `
    // WHERE 
    // major =${major} AND college = ${college} 

    const { status, data } = await MySql.query(sql)
    if (status) {
        res.fail()
    } else {
        res.send({ code: 200, data: data[1], total: data[0][0].total, msg: "success" })
    }

}

async function manageTeacher (req, res) {
    const { page, size, collegeId, teaName } = req.body
    let collegeFilter = ''
    let nameFilter = ''
    if (collegeId) {
        collegeFilter = `AND userinfo.college_id =${collegeId} `
    }
    if (teaName) {
        nameFilter = `AND name ='${teaName}'`
    }
    let sql = `
        SELECT count(sid) as total FROM userinfo WHERE identity =2 ${collegeFilter} ${nameFilter};
        SELECT sid,name,sex,pwd,age,class_info,source,phone,grade.id as gradeId,grade.grade,college.id as collegeId,college.college,major.id as majorId, major.major
        FROM userinfo 
        LEFT JOIN grade 
        ON userinfo.grade_id = grade.id 
        LEFT JOIN college
        ON userinfo.college_id = college.id
        LEFT JOIN major
        ON userinfo.major_id = major.id
        WHERE userinfo.identity =2 ${collegeFilter} ${nameFilter}
        LIMIT ${(+page - 1) * +size},${+size};
        `
    const { status, data } = await MySql.query(sql)
    if (status) {
        res.fail()
    } else {
        res.send({ code: 200, data: data[1], total: data[0][0].total, msg: "success" })
    }
}

async function selectAllCollege (req, res) {
    let sql = `SELECT * FROM college `
    const { status, data } = await MySql.query(sql)
    if (status) {
        res.fail()
    } else {
        res.send({ code: 200, data: data, msg: "success" })
    }
}
async function selectMajorByCollegeId (req, res) {
    const { collegeId } = req.body
    let sql = ` 
    SELECT * FROM major WHERE college_id = ${collegeId}
    `
    const { status, data } = await MySql.query(sql)
    if (status) {
        res.fail()
    } else {
        res.send({ code: 200, data: data, msg: "success" })
    }
}

async function updateUserInfoBySid (req, res) {
    const { sid, name, sex, age, pwd, grede_id, college_id, major_id, source, phone } = req.body
    let sql = `
    UPDATE userinfo SET 
        name='${name}',
        sex=${sex},
        age=${age},
        pwd=${pwd},
        grade_id=${grede_id},
        college_id=${college_id},
        major_id=${major_id},
        source='${source}',
        phone=${phone}
    WHERE sid= ${sid}
    `
    const { status } = await MySql.query(sql)
    if (status) {
        res.fail()
    } else {
        res.send({ code: 200, data: null, msg: "修改成功" })
    }
}

async function deleteUserBySid (req, res) {
    const { sid } = req.body
    let sql = `
		DELETE from userinfo WHERE sid = ${sid}
    `
    const { status } = await MySql.query(sql)
    if (status) {
        res.fail()
    } else {
        res.send({ code: 200, data: null, msg: "删除成功" })
    }
}

route.post('/manage/tea', manageTeacher)
route.post('/user_info', getUserInfo)
route.post('/manage/stu', manageStudent)
route.post('/select/selectAllCollege', selectAllCollege)
route.post('/select/selectMajorByCollegeId', selectMajorByCollegeId)
route.post('/update/updateUserInfoBySid', updateUserInfoBySid)
route.post('/delete/deleteUserBySid', deleteUserBySid)
module.exports = route