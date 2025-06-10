/*
 * @Description: 我的收藏模块路由
 */
var express = require('express');
var collectRouter = express.Router();
const addressController = require('../../controllers/addressController')

collectRouter
  .post('/user/address/getList', addressController.getAddressList)
  .post('/user/addresss/addAddress', addressController.addAddress)
  .post('/user/addresss/deleteAddress', addressController.deleteAddress)
  .post('/user/addresss/updateAddress', addressController.updateAddress)

module.exports = collectRouter;