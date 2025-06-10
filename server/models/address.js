/*
 * @Description: 收获地址
 */
const db = require('./db.js');

module.exports = {
  // 获取地址列表
  getAddressList: async (user_id) => {
    const sql = `select * from address where uid =?`
    return await db.query(sql, user_id)
  },
  // 获取详情
  getInfo: async (id) => {
    const sql = `select * from address where id =?`
    console.log('==========================================')
    console.log(id)
    console.log(await db.query(sql, id))
    console.log('==========================================')
    return await db.query(sql, id)
  },
  // 增加地址
  addAddress: async (user_id, name, phoneNum, content) => {
    const sql = `insert into address values (null, ?, ?, ?, ?)`
    return await db.query(sql, [name, phoneNum, content, user_id])
  },
  // 查询具体数量
  getCount: async (user_id) => {
    const sql = `select * from address where uid =?`
    return await db.query(sql, user_id)
  },
  // 编辑地址
  updateAdderss: async (id, name, phoneNum, content) => {
    const sql = `update address set name =? , phoneNum =? , content =? where id =?`
    return await db.query(sql, [name, phoneNum, content, id])
  },
  // 删除地址
  deleteAddress: async (id) => {
    const sql = `delete from address where id =?`
    return await db.query(sql, id)
  }
}