/*
 * @Description: 用户模块路由
 */
var express = require('express');
var userRouter = express.Router();
const statistics = require('../../controllers/statisticsController')

userRouter
  .post('/statistics/getCount', statistics.getCount)

module.exports = userRouter;