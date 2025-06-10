/*
 * @Description: 资源模块控制器
 */
const resourcesDao = require('../models/resourcesDao');
module.exports = {
  /**
   * 获取轮播图数据
   */
  Carousel: async (req, res, next) => {
    let carousel = await resourcesDao.Carousel();
    res.send({
      code: '001',
      carousel
    })
  }
}