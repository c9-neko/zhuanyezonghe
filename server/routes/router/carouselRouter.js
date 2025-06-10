/*
 * @Description: 我的收藏模块路由
 */
var express = require('express');
var carouselRouter = express.Router();
const carouselController = require('../../controllers/carsouelController')

carouselRouter
  .post('/carousel/getList', carouselController.getList)
  .post('/carousel/addImg', carouselController.addImg)
  .post('/carousel/deleteImg', carouselController.deleteImg)

module.exports = carouselRouter;