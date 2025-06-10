/*
 * @Description: 用户模块数据持久层
 */
const db = require('./db.js');

module.exports = {
  // 根据用户名和密码查询用户信息
  Login: async (userName, password) => {
    const sql = 'select * from users where userName = ? and password = ?';
    return await db.query(sql, [userName, password]);
  },
  // 根据用户名查询用户信息
  FindUserName: async (userName) => {
    const sql = 'select * from users where userName = ?';
    return await db.query(sql, [userName]);
  },
  // 插入用户信息
  Register: async (userName, password, userPhoneNumber, roleType="user", email="null") => {
    const sql = 'insert into users values(null,?,?,?,?,?)';
    return await db.query(sql, [userName, password, userPhoneNumber, roleType, email]);
  },
  FindAllUser: async (cp, searchKey) => {
    const start = (cp - 1) * 15
    const sql = `select * from users where userName like '%${searchKey}%' or password like '%${searchKey}%' or userPhoneNumber like '%${searchKey}%' or roleType like '%${searchKey}%' or email like '%${searchKey}%' limit ?,?`
    const sql1 = `select * from users where userName like '%${searchKey}%' or password like '%${searchKey}%' or userPhoneNumber like '%${searchKey}%' or roleType like '%${searchKey}%' or email like '%${searchKey}%'`
    return {
      data: await db.query(sql, [start, start + 15]),
      total: (await db.query(sql1)).length
    }
  },
  DeleteUser: async (id) => {
    const sql = `delete from users where user_id=?`
    return await db.query(sql, id)
  },
  UpdateUser: async (userName, password, phoneNum, email, user_id) => {
    const sql = `update users set userName=? , password=? , userPhoneNumber=? , email=? where user_id=?`
    return await db.query(sql, [userName, password, phoneNum, email, user_id])
  },
  getCount: async () => {
    const sql = `select * from users`
    return await db.query(sql)
  },
  getUserName: async (user_id) => {
    let sql = `select userName from users where user_id=?`
    return await db.query(sql, user_id)
  },
  getUserInfo: async (user_id) => {
    let sql = `select * from users where user_id=?`
    return await db.query(sql, user_id)
  }
}