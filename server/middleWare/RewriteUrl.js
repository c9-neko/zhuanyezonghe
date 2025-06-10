/*
 * @Description: 重写静态资源URL
 */
module.exports = (req, res, next) => {
  if (req.url.startsWith('/public')) {
    req.url = req.url.replace('/public', '');
  }
  next();
}