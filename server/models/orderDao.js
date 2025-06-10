/*
 * @Description: 订单模块数据持久层
 */
const db = require('./db.js');

module.exports = {
  // 连接数据库获取所有的订单id
  GetOrderGroup: async (user_id) => {
    let sql = 'select distinct order_id from orders where user_id = ? order by order_id desc';
    return await db.query(sql, user_id);
  },
  // 连接数据库获取所有的订单详细信息
  GetOrder: async (user_id) => {
    let sql = 'select * from orders where user_id =? order by order_time desc';
    return await db.query(sql, user_id);
  },
  // 连接数据库插入订单信息
  AddOrder: async (length, data) => {
    let sql = 'insert into orders values(null,?,?,?,?,?,?,?,?)';
    for (let i = 0; i < length - 1; i++) {
      sql += ",(null,?,?,?,?,?,?,?,?)"
    }
    return await db.query(sql, data);
  },
  // 改变订单状态
  updateStatus: async (order_id, status) => {
    let sql = `update orders set status =? where order_id =?`
    return await db.query(sql, [status, order_id])
  },
  getCount: async () => {
    let sql = `select * from orders`
    return await db.query(sql)
  },
  getOrderList: async (searchKey) => {
    let sql = `select order_id from orders where order_id like "%${searchKey}%"`
    return await db.query(sql)
  },
  getOrderListByOrderId: async (order_id) => {
    let sql = `select * from orders where order_id=?`
    return await db.query(sql, order_id)
  }
}