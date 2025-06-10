/*
 * @Description: 订单模块路由
 */
var express = require('express');
var orderRouter = express.Router();
const orderController = require('../../controllers/orderController')

orderRouter
  .post('/user/order/getOrder', orderController.GetOrder)
  .post('/user/order/addOrder', orderController.AddOrder)
  .post('/user/order/changeStatus', orderController.UpdateStatus)
  .post('/user/order/getOrderList', orderController.getOrderList)

module.exports = orderRouter;