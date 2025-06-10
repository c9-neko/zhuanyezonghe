/*
 * @Description: 全局错误处理中间件
 */
module.exports = (req, res, next) => {
  try {
    next();
  } catch (error) {
    console.log(error);
    res.send({
      code: '500',
      msg: '服务器未知错误'
    })
  }
}