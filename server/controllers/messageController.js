/*
 * @Description: 留言模块控制器
 */
const message = require('../models/messages');
const checkLogin = require('../middleware/checkLogin');
const db = require('../models/db');

module.exports = {
  /**
   * 添加留言
   */
  addMessage: async (req, res, next) => {
    let { title, content, user_id } = req.body;
    // 校验用户是否登录
    if (!checkLogin(req, res, user_id)) {
      return;
    }
    let resOfadd = await message.addMessage(title, content, user_id)
    if (resOfadd.affectedRows === 1) {
      res.send({
        code: '001',
        msg: '添加留言成功'
      })
      return;
    } else {
      res.send({
        code: '002',
        msg: '添加留言失败'
      })
    }
  },
  /**
   * @description 获取用户个人留言列表
   */
  getSelfList: async (req, res, next) => {
    let { user_id, cp } = req.body
    // 校验用户是否登录
    if (!checkLogin(req, res, user_id)) {
      return;
    }
    let resultOfList = await message.getSelfList(user_id, cp)
    res.send({
      code: '001',
      data: resultOfList
    })
  },
  /**
   * @description 回复留言
   */
  answer: async (req, res, next) => {
    const { id, answer } = req.body
    let resultOfUpdate = await message.answer(id, answer)
    if (resultOfUpdate.affectedRows === 1) {
      res.send({
        code: '001',
        msg: '回复成功'
      })
      return;
    } else {
      res.send({
        code: '002',
        msg: '回复失败'
      })
    }
  },
  /**
   * @description 删除留言
   */
  _delete: async (req, res, next) => {
    const { id } = req.body
    let resultOfDelete = await message._delete(id)
    if (resultOfDelete.affectedRows === 1) {
      res.send({
        code: '001',
        msg: '删除成功'
      })
      return;
    } else {
      res.send({
        code: '002',
        msg: '删除失败'
      })
    }
  },
  // 编辑
  update: async (req, res, next) => {
    const { id, title, content } = req.body
    let resultOfUpdate = await message.update(id, title, content)
    if (resultOfUpdate.affectedRows === 1) {
      res.send({
        code: '001',
        msg: '编辑成功'
      })
      return;
    } else {
      res.send({
        code: '002',
        msg: '编辑失败'
      })
    }
  },
  // 后台获取列表
  getAdminList: async (req, res, next) => {
    const { cp, searchKey } = req.body
    let result = await message.getAdminList(cp, searchKey)
    res.send({
      code: '001',
      data: result
    })
  }

}