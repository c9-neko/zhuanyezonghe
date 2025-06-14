/*
 * @Description: 购物车模块数据持久层
 */
const db = require('./db.js');

module.exports = {
  // 获取购物车信息
  GetShoppingCart: async (user_id) => {
    const sql = 'SELECT * FROM shoppingCart WHERE user_id = ?';
    return await db.query(sql, [user_id]);
  },
  // 查询用户的购物车的某个商品
  FindShoppingCart: async (user_id, product_id) => {
    const sql = 'SELECT * FROM shoppingCart WHERE user_id = ? AND product_id = ?';
    return await db.query(sql, [user_id, product_id]);
  },
  // 新插入购物车信息
  AddShoppingCart: async (user_id, product_id) => {
    const sql = 'INSERT INTO shoppingCart VALUES (null, ?, ?, 1)';
    return await db.query(sql, [user_id, product_id]);
  },
  // 更新购物车商品数量
  UpdateShoppingCart: async (NewNum, user_id, product_id) => {
    const sql = 'UPDATE shoppingCart SET num = ? WHERE user_id = ? AND product_id = ?';
    return await db.query(sql, [NewNum, user_id, product_id]);
  },
  // 删除购物车信息
  DeleteShoppingCart: async (user_id, product_id) => {
    const sql = 'DELETE FROM shoppingCart WHERE user_id = ? AND product_id = ?';
    return await db.query(sql, [user_id, product_id]);
  }
}