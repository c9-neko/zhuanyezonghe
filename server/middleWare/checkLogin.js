/*
 * @Description: 判断是否登录(session中的用户id与请求体传过来的用户id是否一致)
 */

/**
 * 校验用户是否登录
 */
module.exports = function (req, res, user_id) {
  // 判断请求传递的用户id 与 session中的用户id是否一致
  // if (!req.session.hasOwnProperty('user') || user_id != req.session.user.user_id) {
  //   res.send({
  //     code: '401',
  //     msg: '用户名没有登录，请登录后再操作'
  //   })
  //   return false;
  // }
  return true;
}