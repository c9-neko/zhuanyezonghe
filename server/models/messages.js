/*
 * @Description: 订单模块数据持久层
 */
const db = require('./db.js');

module.exports = {
  // 添加留言
  addMessage: async (title, content, user_id) => {
    var time = new Date();
    function timeAdd0 (str) {
      if (str < 10) {
        str = '0' + str;
      }
      return str;
    }
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    const createTime =  y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
    const sql = 'insert into messages values(null,?,?,?,null,?, null)';
    return await db.query(sql, [title, content, createTime, user_id]);
  },
  // 检查某留言是否存在
  checkMessage: async (id) => {
    let sql = `select id from messages where id =?`
    return await db.query(sql, id)
  },
  // 获取列表
  getSelfList: async (user_id, cp) => {
    const start = (cp - 1) * 10
    const end = start + 10
    let sql = `select * from messages where uid =? limit ?, ?`
    let sql1 = `select * from messages where uid =?`
    const data = await db.query(sql, [user_id, start, end])
    const total = (await db.query(sql1, user_id)).length
    return {
      data,total
    }
  },
  // 后台获取列表
  getAdminList: async (cp, searchKey) => {
    const start = (cp - 1) * 10
    const end = start + 10
    let sql = `select * from messages where title like "%${ searchKey }%" or content like "%${ searchKey }%" or answer like "%${ searchKey }%" limit ?, ?`
    let sql1 = `select * from messages where title like "%${ searchKey }%" or content like "%${ searchKey }%" or answer like "%${ searchKey }%"`
    const data = await db.query(sql, [start, end])
    const total = (await db.query(sql1)).length
    return {
      data,total
    }
  },
  // 连接数据库获取所有的订单详细信息
  answer: async (id, answer) => {
    var time = new Date();
    function timeAdd0 (str) {
      if (str < 10) {
        str = '0' + str;
      }
      return str;
    }
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    const answerTime =  y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
    let sql = 'update messages set answer =? , answerTime =? where id =? ';
    return await db.query(sql, [answer, answerTime, id]);
  },
  // 删除
  _delete: async (id) => {
    let sql = `delete from messages where id =?`
    return await db.query(sql, id)
  },
  // 编辑
  update: async (id, title, content) => {
    var time = new Date();
    function timeAdd0 (str) {
      if (str < 10) {
        str = '0' + str;
      }
      return str;
    }
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    const createTime =  y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
const sql = 'update messages set title = ?, content = ?, createTime = ? where id = ?';
return await db.query(sql, [title, content, createTime, id]);
  },
  getCount: async () => {
    const sql = `select * from messages`
    return await db.query(sql)
  }
}