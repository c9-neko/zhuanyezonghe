/*
 * @Description: 用户模块控制器
 */
const userDao = require('../models/userDao');
const { checkUserInfo, checkUserName } = require('../middleware/checkUserInfo');
const db = require('../models/db');

module.exports = {

  /**
   * 用户登录
   */
  Login: async (req, res, next) => {

    let { userName, password } = req.body;

    // 校验用户信息是否符合规则
    if (!checkUserInfo(res, userName, password)) {
      return;
    }

    // 连接数据库根据用户名和密码查询用户信息
    let user = await userDao.Login(userName, password);
    // 结果集长度为0则代表没有该用户
    if (user.length === 0) {
      res.send({
        code: '004',
        msg: '用户名或密码错误'
      })
      return;
    }

    // 数据库设置用户名唯一
    // 结果集长度为1则代表存在该用户
    if (user.length === 1) {

      const loginUser = {
        user_id: user[0].user_id,
        userName: user[0].userName
      };
      if (user[0].roleType == 'user') {
        // 保存用户信息到session
        req.session.user = loginUser;

        res.send({
          code: '001',
          user: loginUser,
          msg: '登录成功'
        })
        return;
      } else {
        res.send({
          code: '003',
          msg: '该账号为非用户账号，不能登录'
        })
        return;
      }
    }

    //数据库设置用户名唯一
    //若存在user.length != 1 || user.length!=0
    //返回未知错误
    //正常不会出现
    res.send({
      code: '500',
      msg: '未知错误'
    })
  },
  /**
   * @description 后台登录
   */
  loginByAdmin: async (req, res, next) => {
    let { account, password } = req.body;

    // 校验用户信息是否符合规则
    if (!checkUserInfo(res, account, password)) {
      return;
    }

    // 连接数据库根据用户名和密码查询用户信息
    let user = await userDao.Login(account, password);
    // 结果集长度为0则代表没有该用户
    if (user.length === 0) {
      res.send({
        code: '004',
        msg: '用户名或密码错误'
      })
      return;
    }

    // 数据库设置用户名唯一
    // 结果集长度为1则代表存在该用户
    if (user.length === 1) {

      const loginUser = {
        user_id: user[0].user_id,
        userName: user[0].userName
      };
      if (user[0].roleType == 'admin') {
        // 保存用户信息到session
        req.session.user = loginUser;
        res.send({
          code: '001',
          user: loginUser,
          msg: '登录成功'
        })
        return;
      } else {
        res.send({
          code: '003',
          msg: '该账号为非管理员账号，不能登录'
        })
        return;
      }
    }

    //数据库设置用户名唯一
    //若存在user.length != 1 || user.length!=0
    //返回未知错误
    //正常不会出现
    res.send({
      code: '500',
      msg: '未知错误'
    })
  },
  /**
   * 查询是否存在某个用户名,用于注册时前端校验
   */
  FindUserName: async (req, res, next) => {
    let { userName } = req.body;

    // 校验用户名是否符合规则
    if (!checkUserName(req, userName)) {
      return;
    }
    // 连接数据库根据用户名查询用户信息
    let user = await userDao.FindUserName(userName);
    // 结果集长度为0则代表不存在该用户,可以注册
    if (user.length === 0) {
      res.send({
        code: '001',
        msg: '用户名不存在，可以注册'
      })
      return;
    }

    //数据库设置用户名唯一
    //结果集长度为1则代表存在该用户,不可以注册
    if (user.length === 1) {
      res.send({
        code: '004',
        msg: '用户名已经存在，不能注册'
      })
      return;
    }

    //数据库设置用户名唯一，
    //若存在user.length != 1 || user.length!=0
    //返回未知错误
    //正常不会出现
    res.send({
      code: '500',
      msg: '未知错误'
    })
  },
  Register: async (req, res, next) => {
    let { userName, password, phoneNum, email, roleType } = req.body;

    // 校验用户信息是否符合规则
    if (!checkUserInfo(res, userName, password)) {
      return;
    }
    // 连接数据库根据用户名查询用户信息
    // 先判断该用户是否存在
    let user = await userDao.FindUserName(userName);

    if (user.length !== 0) {
      res.send({
        code: '004',
        msg: '用户名已经存在，不能注册'
      })
      return;
    }

    try {
      // 连接数据库插入用户信息
      let registerResult = await userDao.Register(userName, password, phoneNum, roleType="user", email);
      // 操作所影响的记录行数为1,则代表注册成功
      if (registerResult.affectedRows === 1) {
        res.send({
          code: '001',
          msg: '注册成功'
        })
        return;
      }
      // 否则失败
      res.send({
        code: '500',
        msg: '未知错误，注册失败'
      })
    } catch (error) {
      res.send({
            code: '005',
            msg: error.message
          })
          return;
    }
  },
  GetAllUser: async (req, res, next) => {
    const { cp, searchKey } = req.body
    const data = await userDao.FindAllUser(cp, searchKey)
    res.send({
      code: '001',
      data,
      msg: 'Success'
    })
  },
  DeleteUser: async (req, res, next) => {
    const { user_id } = req.body
    const result = await userDao.DeleteUser(user_id)
    if (result.affectedRows === 1) {
        res.send({
          code: '001',
          msg: '删除成功'
        })
        return;
      }
      // 否则失败
      res.send({
        code: '500',
        msg: '未知错误，删除失败'
      })
  },
  UpdateUser: async (req, res, next) => {
    let { userName, password, phoneNum, email, user_id } = req.body;
    try {
      // 更新用户信息
      let result = await userDao.UpdateUser(userName, password, phoneNum, email, user_id);
      // 操作所影响的记录行数为1,则代表注册成功
      if (result.affectedRows === 1) {
        res.send({
          code: '001',
          msg: '更新成功'
        })
        return;
      }
      // 否则失败
      res.send({
        code: '500',
        msg: '未知错误，注册失败'
      })
    } catch (error) {
      res.send({
            code: '005',
            msg: error.message
          })
          return;
    }
  },
  getUserInfo: async (req, res, next) => {
    let { id  } = req.body
    let result = await userDao.getUserInfo(id)
    if (result.length == 0) {
      // 否则失败
      res.send({
        code: '002',
        msg: '查无此人'
      })
      return
    } else {
      res.send({
        code: '001',
        msg: 'Success',
        data: result[0]
      })
    }
  },
  updateUserInfo: async (req, res, next) => {
    let { userName, password, phoneNum, email, user_id } = req.body;
    try {
      // 更新用户信息
      let result = await userDao.UpdateUser(userName, password, phoneNum, email, user_id);
      // 操作所影响的记录行数为1,则代表注册成功
      if (result.affectedRows === 1) {
        res.send({
          code: '001',
          msg: '更新成功'
        })
        return;
      }
      // 否则失败
      res.send({
        code: '500',
        msg: '未知错误，注册失败'
      })
    } catch (error) {
      res.send({
            code: '005',
            msg: error.message
          })
          return;
    }
  }
};