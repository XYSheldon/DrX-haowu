const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const admins = db.collection('admins');
const oprec = db.collection('oprecord');
var s;
exports.main = (event, context) => {
  const {
    OPENID,
    APPID,
    UNIONID
  } = cloud.getWXContext();
  s = admins.where({
    _openid: OPENID
  }).count();
  console.log(s);
  if (s >= 1) {
    console.log('验证成功');

    if (event.op == 'add') {
      console.log('ADD!');
    };
    return {
      count: s
    }
  }
  return {
    result: 'No Admins Permission'
  }
}