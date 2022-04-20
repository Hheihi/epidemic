// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, async function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("session");
//     // { sid: '18405090233', name: '刘阳', type: 3 }
//     dbo.collection("sessions").find({}).toArray(function(err, result) { // 返回集合中所有数据
//         if (err) throw err;
//         // if (result.length === 0) return getSession("session过期！")
//         let sessionInfo = JSON.parse(result[0].session).userInfo
//         console.log(sessionInfo);
//         db.close();
//     });
// });






// function getSession(info) {
//     console.log(info);
//     return info
// }
// exports.info = sessionInfo