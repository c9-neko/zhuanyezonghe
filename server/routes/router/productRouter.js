/*
 * @Description: 商品模块路由
 */
var express = require('express');
var productRouter = express.Router();
const productController = require('../../controllers/productController')

productRouter
  .post('/product/getAllProduct', productController.GetAllProduct)
  .post('/product/getPromoProduct', productController.GetPromoProduct)
  .post('/product/getHotProduct', productController.GetHotProduct)
  .post('/product/getProductByCategory', productController.GetProductByCategory)
  .post('/product/getCategory', productController.GetCategory)
  .post('/product/getProductBySearch', productController.GetProductBySearch)
  .post('/product/getDetails', productController.GetDetails)
  .post('/product/getDetailsPicture', productController.GetDetailsPicture)
  .post('/product/getAdminList', productController.getAdminList)
  .post('/product/delete', productController.deleteProduct)
  .post('/product/getProductImgs', productController.getProductImgs)
  .post('/product/deleteProductImg', productController.deleteProductImg)
  .post('/product/upload', productController.upload)
  .post('/product/getDetailByAdmin', productController.getDetailByAdmin)
  .post('/product/uploadProductPicture', productController.uploadProductPicture)
  .post('/product/addProduct', productController.addProduct)
  .post('/product/editProduct', productController.editProduct)
  
module.exports = productRouter;