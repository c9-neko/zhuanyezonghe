/*
 * @Description: 用户模块路由
 */
var express = require('express');
var userRouter = express.Router();
const userController = require('../../controllers/userController')

userRouter
  .post('/users/login', userController.Login)
  .post('/users/findUserName', userController.FindUserName)
  .post('/users/register', userController.Register)
  .post('/users/getUserInfo', userController.getUserInfo)
  .post('/users/updateUserInfo', userController.updateUserInfo)
  .post('/admin/login', userController.loginByAdmin)
  .post('/admin/getAllUser', userController.GetAllUser)
  .post('/admin/deleteUser', userController.DeleteUser)
  .post('/admin/updateUser', userController.UpdateUser)

module.exports = userRouter;