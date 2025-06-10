/*
 * @Description: 全局登录拦截器
 */
module.exports = (req, res, next) => {
  console.log(1)
  console.log(req.url.startsWith('/user/'))
  console.log(req.session)
  console.log(1)
  if (req.url.startsWith('/user/')) {
    if (!req.session.user) {
      res.send({
        code: '401',
        msg: '用户没有登录，请登录后再操作'
      })
      return;
    }
  }
  next();
}