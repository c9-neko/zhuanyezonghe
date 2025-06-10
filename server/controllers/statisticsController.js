/*
 * @Description: 用户模块控制器
 */
const userDao = require('../models/userDao');
const message = require('../models/messages');
const product = require('../models/productDao');
const order = require('../models/orderDao');

module.exports = {

  /**
   * 获取统计数量
   */
  getCount: async (req, res, next) => {
    const userCount = (await userDao.getCount()).length
    const messageCount = (await message.getCount()).length
    const productCount = (await product.getCount()).length
    const orderCount = (await order.getCount()).length
    res.send({
      msg: 'Success',
      data: {
        userCount,
        messageCount,
        productCount,
        orderCount
      }
    })
  }
};