/*
 * @Description: 订单模块控制器
 */
const orderDao = require('../models/orderDao');
const userDao = require('../models/userDao')
const shoppingCartDao = require('../models/shoppingCartDao');
const productDao = require('../models/productDao');
const address = require('../models/address')
const checkLogin = require('../middleware/checkLogin');
const db = require('../models/db');

module.exports = {
  /**
   * @description 后台获取orderList
   */
  getOrderList: async (req, res, next) => {
    const { searchKey } = req.body
    const result = await orderDao.getOrderList(searchKey)
    const order_id = {}
    if (result.length == 0) {
      res.send({
        code: '001',
        data: []
      })
      return
    }
    result.forEach(item => {
      order_id[item.order_id] = true
    });
    const orderIdList = Object.keys(order_id)
    const data = []
    for (let i = 0; i < orderIdList.length; i++) {
      const obj = {
        orderId: orderIdList[i],
        price: 0,
        userName: '',
        orderTime: '',
        status: ''
      }
      const arr = await orderDao.getOrderListByOrderId(orderIdList[i])
      obj.orderTime = arr[0].order_time
      obj.status = arr[0].status
      obj.userName = (await userDao.getUserName(arr[0].user_id))[0].userName
      arr.forEach(item => {
        obj.price = obj.price + Number(item.product_price)
      })
      data.push(obj)
    }
    res.send({
      code: '001',
      data
    })
  },
  /**
   * 获取用户的所有订单信息
   */
  GetOrder: async (req, res, next) => {
    let { user_id } = req.body;
    // 校验用户是否登录
    if (!checkLogin(req, res, user_id)) {
      return;
    }
    // 获取所有的订单id
    const ordersGroup = await orderDao.GetOrderGroup(user_id);
    // 该用户没有订单,直接返回信息
    if (ordersGroup.length == 0) {
      res.send({
        code: '002',
        msg: '该用户没有订单信息'
      })
      return;
    }

    // 获取所有的订单详细信息
    const orders = await orderDao.GetOrder(user_id);

    let ordersList = [];
    // 生成每个订单的详细信息列表
    for (let i = 0; i < ordersGroup.length; i++) {
      const orderID = ordersGroup[i];
      let tempOrder = {
        data: [],
        address: {},
        orderId: '',
        status: ''
      };

      for (let j = 0; j < orders.length; j++) {
        const order = orders[j];
        console.log(order)
        if (orderID.order_id == order.order_id) {
          // 获取每个商品详细信息
          const product = await productDao.GetProductById(order.product_id);
          order.product_name = product[0].product_name;
          order.product_picture = product[0].product_picture;
          tempOrder.address = (await address.getInfo(order.addressId))[0] ? (await address.getInfo(order.addressId))[0] : {
            content: '',
            id: order.addressId,
            name: '',
            phoneNum: ''
          }
          tempOrder.data.push(order);
          tempOrder.orderId = orderID.order_id
        }
      }
      ordersList.push(tempOrder);
    }
    res.send({
      code: '001',
      orders: ordersList
    })

  },
  /**
   * 添加用户订单信息
   */
  AddOrder: async (req, res, next) => {
    let { user_id, products, addressId, status } = req.body;
    // 校验用户是否登录
    if (!checkLogin(req, res,
       user_id)) {
      return;
    }

    // 获取当前时间戳
    const timeTemp = new Date().getTime();
    // 生成订单id：用户id+时间戳(string)
    const orderID = +("" + user_id + timeTemp);

    let data = [];
    // 根据数据库表结构生成字段信息
    for (let i = 0; i < products.length; i++) {
      const temp = products[i];
      let product = [orderID, user_id, temp.productID, temp.num, temp.price, timeTemp, status, addressId];
      data.push(...product);
    }

    try {
      // 把订单信息插入数据库
      const result = await orderDao.AddOrder(products.length, data);

      // 插入成功
      if (result.affectedRows == products.length) {
        //删除购物车
        let rows = 0;
        for (let i = 0; i < products.length; i++) {
          const temp = products[i];
          const result = await shoppingCartDao.DeleteShoppingCart(user_id, temp.productID);
          rows += result.affectedRows;
        }
        //判断删除购物车是否成功
        if (rows != products.length) {
          res.send({
            code: '002',
            msg: '购买成功,但购物车没有更新成功'
          })
          return;
        }

        res.send({
          code: '001',
          msg: '购买成功'
        })
      } else {
        res.send({
          code: '004',
          msg: '购买失败,未知原因'
        })
      }
    } catch (error) {
      res.send({
        code: '500',
        msg: '购买失败,未知原因'
      })
    }
  },
  /**
   * 改变订单状态
   */
  UpdateStatus: async (req, res, next) => {
    const { order_id, status } = req.body 
    const result = await orderDao.updateStatus(order_id, status)
    if (result.affectedRows >= 1) {
      res.send({
        code: '001',
        msg: '状态更改成功'
      })
      return;
    } else {
      res.send({
        code: '002',
        msg: '状态更改失败'
      })
    }
  }
}