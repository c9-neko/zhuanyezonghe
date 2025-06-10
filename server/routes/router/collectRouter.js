/*
 * @Description: 我的收藏模块路由
 */
var express = require('express');
var collectRouter = express.Router();
const collectController = require('../../controllers/collectController')

collectRouter
  .post('/user/collect/addCollect', collectController.AddCollect)
  .post('/user/collect/getCollect', collectController.GetCollect)
  .post('/user/collect/deleteCollect', collectController.DeleteCollect)

module.exports = collectRouter;