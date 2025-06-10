/*
 * @Description: 收货地址
 */
const addressDao = require('../models/address');
const checkLogin = require('../middleware/checkLogin');

module.exports = {
  /**
   * 获取地址列表
   */
  getAddressList: async (req, res, next) => {
    let { user_id } = req.body;
    // 校验用户是否登录
    if (!checkLogin(req, res, user_id)) {
      return;
    }
    // 判断该用户的收藏列表是否存在该商品
    let result = await addressDao.getAddressList(user_id);
    res.send({
      code: '001',
      data: result
    })
  },
  /**
   * 增加地址
   */
  addAddress: async (req, res, next) => {
    let { user_id, name, phoneNum, content } = req.body;
    // 校验用户是否登录
    if (!checkLogin(req, res, user_id)) {
      return;
    }
    // 获取数量
    const count = await addressDao.getCount(user_id);
    if (count.length > 6) {
      res.send({
        code: '002',
        msg: '最多添加十条收货地址'
      })
      return
    }
    const result = await addressDao.addAddress(user_id, name, phoneNum, content)
    if (result.affectedRows === 1) {
      res.send({
        code: '001',
        msg: '新增成功'
      })
      return;
    } else {
      res.send({
        code: '002',
        msg: '新增失败'
      })
    }
  },
  /**
   * 删除
   */
  deleteAddress: async (req, res, next) => {
    let { id } = req.body;
    // 校验用户是否登录
    if (!checkLogin(req, res, user_id)) {
      return;
    }

    // 判断是否存在该地址
    let result = await addressDao.getInfo(id);
    if (result.length > 0) {
      // 如果存在则删除
      try {
        const result = await addressDao.deleteAddress(id);
        // 判断是否删除成功
        if (result.affectedRows === 1) {
          res.send({
            code: '001',
            msg: '删除成功'
          })
          return;
        }
      } catch (error) {
         res.send({
            code: '001',
            msg: '删除失败'
          })
          return;
      }
    } else {
      // 不存在则返回信息
      res.send({
        code: '002',
        msg: '该地址不存在'
      })
    }
  },
  /**
   * @description 编辑
   */
  updateAddress: async (req, res, next) => {
    const { id, name, phoneNum, content } = req.body
    // 判断是否存在该地址
    let result = await addressDao.getInfo(id);
    if (result.length > 0) {
      // 如果存在则编辑
      try {
        const result = await addressDao.updateAdderss(id, name, phoneNum, content);
        // 判断是否编辑成功
        if (result.affectedRows === 1) {
          res.send({
            code: '001',
            msg: '编辑成功'
          })
          return;
        }
      } catch (error) {
         res.send({
            code: '002',
            msg: error.message
          })
          return;
      }
    } else {
      // 不存在则返回信息
      res.send({
        code: '002',
        msg: '该地址不存在'
      })
    }
  }
}