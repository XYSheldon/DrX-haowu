'use strict';
exports.main = (event, context, callback) => {
  console.log("Hello World")
  console.log(event)
  console.log(event["non-exist"])
  console.log(context)
  const {
    OPENID,
    APPID,
    UNIONID
  } = cloud.getWXContext()

  return {
    OPENID,
    APPID,
    UNIONID,
  }
  callback(null, event);
};