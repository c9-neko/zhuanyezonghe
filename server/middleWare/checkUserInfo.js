/*
 * @Description: 校验用户信息是否符合规则
 */
module.exports = {
  /**
   * 校验用户信息是否符合规则
   */
  checkUserInfo: (res, userName = '', password = '') => {
    // userName = userName ? userName : '';
    // password = password ? password : '';
    // 判断是否为空
    if (userName.length === 0 || password.length === 0) {
      res.send({
        code: '002',
        msg: '用户名或密码不能为空'
      })
      return false;
    }
    // 用户名校验规则
    const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    if (!userNameRule.test(userName)) {
      res.send({
        code: '003',
        msg: '用户名不合法(以字母开头，允许5-16字节，允许字母数字下划线)'
      })
      return false;
    }
    // 密码校验规则
    const passwordRule = /^[a-zA-Z]\w{5,17}$/;
    if (!passwordRule.test(password)) {
      res.send({
        code: '003',
        msg: '密码不合法(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)'
      })
      return false;
    }

    return true;
  },
  /**
   * 校验用户名是否符合规则
   */
  checkUserName: (req, userName = '') => {
    // 判断是否为空
    if (userName.length === 0) {
      res.send({
        code: '002',
        msg: '用户名不能为空'
      })
      return false;
    }
    // 用户名校验规则
    const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    if (!userNameRule.test(userName)) {
      res.send({
        code: '003',
        msg: '用户名不合法(以字母开头，允许5-16字节，允许字母数字下划线)'
      })
      return false;
    }

    return true;
  }
}