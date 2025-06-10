/*
 * @Description: 数据库连接
 */
var mysql = require('mysql');
var dbConfig = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'storedb'
}
var pool = mysql.createPool(dbConfig);

var db = {};

db.query = function (sql, params) {

  return new Promise((resolve, reject) => {
    // 取出链接
    pool.getConnection(function (err, connection) {

      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, params, function (error, results, fields) {
        console.log(`${ sql }=>${ params }`);
        // 释放连接
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });

    });
  });
}
// 导出对象
module.exports = db;
