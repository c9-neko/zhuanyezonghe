/*
 * @Description: 资源模块路由
 */
var express = require('express');
var resourcesRouter = express.Router();
const resourcesController = require('../../controllers/resourcesController')


resourcesRouter
  .post('/resources/carousel', resourcesController.Carousel)

module.exports = resourcesRouter;