const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const pm = db.collection('permission');
const rec = db.collection('record');

exports.main = (event, context) => {
  const {
    OPENID,
    APPID,
    UNIONID
  } = cloud.getWXContext();
  rec.add({
    data: {
      description: '解锁',
      actor: OPENID,
      date: db.serverDate()
    },
    success(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    }
  })
  return {
    OPENID,
    suuid:'0000FFE0-0000-1000-8000-00805F9B34FB',
    result:'Sucess'
  }
}