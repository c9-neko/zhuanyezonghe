/*
 * @Description: 商品模块数据持久层
 */
const db = require('./db.js');

module.exports = {
  // 连接数据库获取商品分类
  GetCategory: async () => {
    const sql = "select * from category";
    return await db.query(sql, []);
  },
  // 连接数据库根据商品分类名称获取分类id
  GetCategoryId: async (categoryName) => {
    const sql = "select * from category where category_name = ?";
    const category = await db.query(sql, [categoryName]);
    return category[0].category_id;
  },
  //  根据商品分类id获取首页展示的商品信息
  GetPromoProduct: async (categoryID) => {
    const sql = "select * from product where category_id = ? order by product_sales desc limit 7";
    return await db.query(sql, categoryID);
  },
  //  分页获取所有的商品信息
  GetAllProduct: async (offset = 0, rows = 0) => {
    let sql = "select * from product ";
    if (rows != 0) {
      sql += "limit " + offset + "," + rows;
    }
    return await db.query(sql, []);
  },
  //  根据商品分类id,分页获取商品信息
  GetProductByCategory: async (categoryID, offset = 0, rows = 0) => {
    let sql = "select * from product where category_id = ? ";

    for (let i = 0; i < categoryID.length - 1; i++) {
      sql += "or category_id = ? ";
    }
    if (rows != 0) {
      sql += "order by product_sales desc limit " + offset + "," + rows;
    }

    return await db.query(sql, categoryID);
  },
  //  根据搜索条件,分页获取商品信息
  GetProductBySearch: async (search, offset = 0, rows = 0) => { 
    let sql = `select * from product where product_name like "%${ search }%" or product_title like "%${ search }%" or product_intro like "%${ search }%"`;

    if (rows != 0) {
      sql += "order by product_sales desc limit " + offset + "," + rows;
    }
    
    return await db.query(sql, []);
  },
  //  根据商品id,获取商品详细信息
  GetProductById: async (id) => {
    const sql = 'select * from product where product_id = ?';
    return await db.query(sql, id);
  },
  //  根据商品id,获取商品图片
  GetDetailsPicture: async (productID) => {
    const sql = "select * from product_picture where product_id = ? ";
    return await db.query(sql, productID);
  },
  // 统计产品数量
  getCount: async () => {
    const sql = `select * from product`
    return await db.query(sql)
  },
  // 后台获取产品列表
  getAdminList: async (cp, searchKey) => {
    const start = (cp - 1)*15
    const end = start + 15
    let data = null
    let total = 0
    if (searchKey) {
      let sql1 = `select * from product where  product_name like '%${searchKey}%' or product_title like '%${searchKey}%' or product_intro like '%${searchKey}%' or product_price like '%${searchKey}%' or product_selling_price like '%${searchKey}%' or product_num like '%${searchKey}%' or product_sales like '%${searchKey}%'`
      total = (await db.query(sql1)).length
      let sql = `select a.product_id,
        a.product_name,
        a.category_id,
        a.product_title,
        a.product_intro,
        a.product_picture,
        a.product_price,
        a.product_selling_price,
        a.product_num,
        a.product_sales,
        b.category_name 
        from category b , product a where (a.product_name like '%${searchKey}%' or a.product_title like '%${searchKey}%' or a.product_intro like '%${searchKey}%' or a.product_price like '%${searchKey}%' or a.product_selling_price like '%${searchKey}%' or a.product_num like '%${searchKey}%' or a.product_sales like '%${searchKey}%') and a.category_id=b.category_id limit ?,?`
      data = await db.query(sql, [start, end])
    } else {
      let sql1 = `select * from product`
      total = (await db.query(sql1)).length
      let sql = `select a.product_id,
        a.product_name,
        a.category_id,
        a.product_title,
        a.product_intro,
        a.product_picture,
        a.product_price,
        a.product_selling_price,
        a.product_num,
        a.product_sales,
        b.category_name 
        from category b , product a where a.category_id=b.category_id limit ?,?`
      data = await db.query(sql, [start, end])
    }
    
    return {
      data,
      total
    }
  },
  // 删除产品
  deleteProduct: async (id) => {
    const sql = `delete from product where product_id=?`
    const sql1 = `delete from product_picture where product_id=?`
    const sql2 = `select * from product_picture where product_id=?`
    const result = await db.query(sql2, id)
    return [
      await db.query(sql, id),
      result.length > 0 ? await db.query(sql1, id) : {affectedRows:0},
      result.length
    ]
  },
  // 获取产品的图片
  getProductImgs: async (id) => {
    let sql = `select * from product_picture where product_id=?`
    return await db.query(sql, id)
  },
  // 删除产品的图片
  deleteProductImg: async (id) => {
    let sql = `delete from product_picture where id=?`
    return await db.query(sql, id)
  },
  // 新增产品的图片
  uploadProductImg: async (id, url) => {
    let sql = `insert into product_picture (id, product_id, product_picture, intro) values (null, ?, ?, null)`
    return await db.query(sql, [id, url])
  },
  // 更新商品封面图片
  uploadProductCoverImg: async (id, url) => {
    let sql = `update product set product_picture =? where product_id=?`
    return await db.query(sql, [url, id])
  },
  // 新增商品
  addProduct: async (product_name,
      category_id,
      product_title,
      product_intro,
      product_picture,
      product_price,
      product_selling_price,
      product_num) => {
    let sql = `insert into product (product_id, product_name, category_id, product_title, product_intro, product_picture, product_price, product_selling_price, product_num, product_sales) values (null,?,?,?,?,?,?,?,?,0)`
    return await db.query(sql, [
      product_name,
      category_id,
      product_title,
      product_intro,
      product_picture,
      product_price,
      product_selling_price,
      product_num
    ])
  },
  // 编辑商品
  editProduct: async (product_name,
      category_id,
      product_title,
      product_intro,
      product_picture,
      product_price,
      product_selling_price,
      product_num,
      product_id,
      product_sales ) => {
    let sql = `update product set product_name=? , category_id=?, product_title=?, product_intro=?, product_picture=?, product_price=?, product_selling_price=?, product_num=?, product_sales=? where product_id=?`
    return await db.query(sql, [
      product_name,
      category_id,
      product_title,
      product_intro,
      product_picture,
      product_price,
      product_selling_price,
      product_num,
      product_sales ,
      product_id
    ])
  }
}