/*
 * @Description: 购物车模块路由
 */
var express = require('express');
var shoppingCartRouter = express.Router();
const shoppingCartController = require('../../controllers/shoppingCartController')

shoppingCartRouter
  .post('/user/shoppingCart/getShoppingCart', shoppingCartController.GetShoppingCart)
  .post('/user/shoppingCart/addShoppingCart', shoppingCartController.AddShoppingCart)
  .post('/user/shoppingCart/deleteShoppingCart', shoppingCartController.DeleteShoppingCart)
  .post('/user/shoppingCart/updateShoppingCart', shoppingCartController.UpdateShoppingCart)

module.exports = shoppingCartRouter;