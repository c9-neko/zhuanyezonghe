/*
 * @Description: 轮播图
 */
const db = require('./db.js');

module.exports = {
  // 获取列表
  getList: async () => {
    const sql = `select * from carousel`
    return await db.query(sql)
  },
  // 增加
  addImg: async (url, desc) => {
    const sql = `insert into carousel (carousel_id, imgPath, describes) values (null, ?, ?)`
    return await db.query(sql, [url, desc])
  },
  // 删除
  deleteImg: async (id) => {
    const sql = `delete from carousel where carousel_id=?`
    return await db.query(sql, id)
  }
}