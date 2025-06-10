/*
 * @Description: 商品模块控制器
 */
const productDao = require('../models/productDao');
const collectDao = require('../models/collectDao');
var multiparty = require("multiparty");
var fs = require('fs')
module.exports = {
  /**
   * 获取商品分类
   */
  GetCategory: async (req, res, next) => {
    const category = await productDao.GetCategory();

    res.send({
      code: '001',
      category
    })
  },
  /**
   * 根据商品分类名称获取首页展示的商品信息
   */
  GetPromoProduct: async (req, res, next) => {
    let { categoryName } = req.body;
    // 根据商品分类名称获取分类id
    const categoryID = await productDao.GetCategoryId(categoryName);
    // 根据商品分类id获取首页展示的商品信息
    const Product = await productDao.GetPromoProduct(categoryID);

    res.send({
      code: '001',
      Product
    })
  },
  /**
   * 根据商品分类名称获取热门商品信息
   */
  GetHotProduct: async (req, res, next) => {
    let { categoryName } = req.body;
    const categoryID = [];

    for (let i = 0; i < categoryName.length; i++) {
      // 根据商品分类名称获取分类id
      const category_id = await productDao.GetCategoryId(categoryName[i]);
      categoryID.push(category_id);
    }
    // 根据商品分类id获取商品信息
    const Product = await productDao.GetProductByCategory(categoryID, 0, 7);

    res.send({
      code: '001',
      Product
    })
  },
  /**
   * 分页获取所有的商品信息
   */
  GetAllProduct: async (req, res, next) => {
    let { currentPage, pageSize } = req.body;
    // 计算开始索引
    const offset = (currentPage - 1) * pageSize;
    const Product = await productDao.GetAllProduct(offset, pageSize);
    // 获取所有的商品数量,用于前端分页计算
    const total = (await productDao.GetAllProduct()).length;
    res.send({
      code: '001',
      Product,
      total
    })
  },
  /**
   * 根据分类id,分页获取商品信息
   */
  GetProductByCategory: async (req, res, next) => {
    let { categoryID, currentPage, pageSize } = req.body;
    // 计算开始索引
    const offset = (currentPage - 1) * pageSize;
    // 分页获取该分类的商品信息
    const Product = await productDao.GetProductByCategory(categoryID, offset, pageSize);
    // 获取该分类所有的商品数量,用于前端分页计算
    const total = (await productDao.GetProductByCategory(categoryID)).length;

    res.send({
      code: '001',
      Product,
      total
    })
  },
  /**
   * 根据搜索条件,分页获取商品信息
   */
  GetProductBySearch: async (req, res, next) => {
    let { search, currentPage, pageSize } = req.body;
    // 计算开始索引
    const offset = (currentPage - 1) * pageSize;
    // 获取分类列表
    const category = await productDao.GetCategory();

    let Product;
    let total;

    for (let i = 0; i < category.length; i++) {
      // 如果搜索条件为某个分类名称,直接返回该分类的商品信息
      if (search == category[i].category_name) {
        // 获取该分类的商品信息
        Product = await productDao.GetProductByCategory(category[i].category_id, offset, pageSize);
        // 获取该分类所有的商品数量,用于前端分页计算
        total = (await productDao.GetProductByCategory(category[i].category_id)).length;

        res.send({
          code: '001',
          Product,
          total
        })
        return;
      }
    }
    // 否则返回根据查询条件模糊查询的商品分页结果
    Product = await productDao.GetProductBySearch(search, offset, pageSize);
    // 获取模糊查询的商品结果总数
    total = (await productDao.GetProductBySearch(search)).length;

    res.send({
      code: '001',
      Product,
      total
    })
  },
  /**
   * 根据商品id,获取商品详细信息
   */
  GetDetails: async (req, res, next) => {
    let { productID, user_id } = req.body;
    const Product = await productDao.GetProductById(productID);
    if (Product.length > 0) {
      Product[0]['isCollected'] = false
    }
    if (user_id) {
      // 获取所有收藏信息
      const collect = await collectDao.GetCollect(user_id);
      try {
        collect.forEach(item => {
          if (item.product_id == productID) {
            Product[0]['isCollected'] = true
            throw new Error('success')
          }
        })
      } catch (error) {}
    } else {
      if (Product.length > 0 && !(Product[0].hasOwnProperty('isCollected'))) {
        Product[0]['isCollected'] = false
      }
    }
    res.send({
      code: '001',
      Product,
    })
  },
  getDetailByAdmin: async (req, res, next) => {
    let { id } = req.body
    const Product = await productDao.GetProductById(id);
    res.send({
      code: '001',
      Product,
    })
  },
  /**
   * 根据商品id,获取商品图片,用于食品详情的页面展示
   */
  GetDetailsPicture: async (req, res, next) => {
    let { productID } = req.body;

    const ProductPicture = await productDao.GetDetailsPicture(productID);

    res.send({
      code: '001',
      ProductPicture,
    })
  },
  // 后台获取产品列表
  getAdminList: async (req, res, next) => {
    let { cp, searchKey } = req.body
    const data = await productDao.getAdminList(cp, searchKey)
    res.send({
      code : '001',
      data
    })
  },
  // 删除产品
  deleteProduct: async (req, res, next) => {
    let { id } = req.body
    const result = await productDao.deleteProduct(id)
    if (result[0].affectedRows === 1) {
      // && result[1].affectedRows >= 1
      if (result[2] > 0 && result[1].affectedRows == result[2]) {
        res.send({
          code: '001',
          msg: '删除成功'
        })
        return;
      } else if(result[2]==0){
        res.send({
          code: '001',
          msg: '删除成功'
        })
        return;
      } else {
        res.send({
          code: '500',
          msg: result[1].msg
        })
      }
    } else {
      res.send({
        code: '002',
        msg: '删除失败'
      })
    }
  },
  // 获取产品图片列表
  getProductImgs: async (req, res, next) => {
    let { product_id } = req.body
    const result = await productDao.getProductImgs(product_id)
    res.send({
      code: '001',
      data: result
    })
  },
  // 删除产品的某个图片
  deleteProductImg: async (req, res, next) => {
    let { id } = req.body
    const result = await productDao.deleteProductImg(id)
    if (result.affectedRows === 1) {
      res.send({
        code: '001',
        msg: '删除成功'
      })
      return;
    } else {
      res.send({
        code: '002',
        msg: '删除失败'
      })
    }
  },
  // 上传产品图片
  upload: async (req, res, next) => {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({ uploadDir: './public/images' });
    form.parse(req, function(err, fields, files) {
        if (err) {
          res.send({
            code: '002',
            msg: '上传失败',
            data: err
          })
          return
        } else {
          const oldPath = files.file[0].path
          const newPath = `./public/images/${files.file[0].originalFilename}`
          fs.rename(oldPath, newPath, function(err) { // 重命名文件
            if(err){
              res.send({
                code: '002',
                msg: '上传失败',
                data: err
              })
              return
            } else {
              productDao.uploadProductImg(fields.id[0], newPath.replace(/^\.\//, '')) 
                .then(ress => {
                  if (ress.affectedRows === 1) {
                    res.send({
                      code: '001',
                      msg: '上传成功',
                      data: {
                        id: ress.insertId,
                        intro: null,
                        product_id: fields.id[0],
                        product_picture: newPath.replace(/^\.\//, '')
                      }
                    })
                    return;
                  } else {
                    res.send({
                      code: '002',
                      msg: '上传失败'
                    })
                    return
                  }
                })
            }
          });
        }
    });
  },
  // 更新商品的封面图片
  uploadProductPicture: async (req, res, next) => {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({ uploadDir: './public/images' });
    form.parse(req, function(err, fields, files) {
        if (err) {
          res.send({
            code: '002',
            msg: '上传失败',
            data: err
          })
          return
        } else {
          const oldPath = files.file[0].path
          const newPath = `./public/images/${files.file[0].originalFilename}`
          fs.rename(oldPath, newPath, function(err) { // 重命名文件
            if(err){
              res.send({
                code: '003',
                msg: '上传失败',
                data: err
              })
              return
            } else {
              if (!fields.hasOwnProperty('id')) {
                res.send({
                    code: '001',
                    msg: '上传成功',
                    data: {
                      product_picture: newPath.replace(/^\.\//, '')
                    }
                  })
                  return;
              } else {
                productDao.uploadProductCoverImg(fields.id[0], newPath.replace(/^\.\//, '')) 
                    .then(ress => {
                      console.log(ress)
                      if (ress.affectedRows === 1) {
                        res.send({
                          code: '001',
                          msg: '上传成功',
                          data: {
                            id: ress.insertId,
                            intro: null,
                            product_id: fields.id[0],
                            product_picture: newPath.replace(/^\.\//, '')
                          }
                        })
                        return;
                      } else {
                        res.send({
                          code: '004',
                          msg: '上传失败'
                        })
                        return
                      }
                    })
                }
              }
          });
        }
    });
  },
  // 新增商品
  addProduct: async (req, res, next) => {
    const {
      product_name,
      category_id,
      product_title,
      product_intro,
      product_picture,
      product_price,
      product_selling_price,
      product_num 
    } = req.body
    const result = await productDao.addProduct(product_name, category_id, product_title,product_intro,product_picture,product_price,product_selling_price,product_num )
    if (result.affectedRows === 1) {
      res.send({
        code: '001',
        msg: '新增成功'
      })
      return;
    } else {
      res.send({
        code: '002',
        msg: '新增失败'
      })
    }
  },
  // 编辑商品
  editProduct: async (req, res, next) => {
    const {
      category_id,
      product_name,
      product_title,
      product_intro,
      product_picture,
      product_price,
      product_selling_price,
      product_num,
      product_id,
      product_sales 
    } = req.body
    const result = await productDao.editProduct(product_name,category_id, product_title,product_intro,product_picture,product_price,product_selling_price,product_num,product_id,product_sales)
    if (result.affectedRows === 1) {
      res.send({
        code: '001',
        msg: '编辑成功'
      })
      return;
    } else {
      res.send({
        code: '002',
        msg: '编辑失败'
      })
    }
  }
}