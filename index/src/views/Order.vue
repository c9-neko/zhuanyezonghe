<!--
 * @Description: 我的订单页面组件
 -->
<template>
  <div class="order">
    <!-- 我的订单头部 -->
    <div class="order-header">
      <div class="order-header-content">
        <p>
          <i class="el-icon-s-order" style="font-size: 30px;color: #ff6700;"></i>
          我的订单
        </p>
      </div>
    </div>
    <!-- 我的订单头部END -->

    <!-- 我的订单主要内容 -->
    <div class="order-content" v-if="orders.length>0">
      <div class="content" v-for="(item,index) in orders" :key="index">
        <ul>
          <!-- 我的订单表头 -->
          <li class="order-info">
            <div class="order-id">订单编号: {{item.data[0].order_id}}</div>
            <div class="order-time">订单时间: {{item.data[0].order_time | dateFormat}}</div>
          </li>
          <li class="order-status">
            <div class="order-id">
              订单状态: 
              <span v-show="!item.isChangeStatus">
                {{item.data[0].status == '1' ? '未发货' : ''}}
                {{item.data[0].status == '2' ? '已发货' : ''}}
                {{item.data[0].status == '3' ? '申请退款' : ''}}
                {{item.data[0].status == '4' ? '订单关闭' : ''}}
                {{item.data[0].status == '5' ? '交易完成' : ''}}
                {{item.data[0].status == '6' ? '未发货' : ''}}
              </span>
              <el-select v-show="item.isChangeStatus" v-model="orderStatus" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button v-show="item.isChangeStatus" style="margin-left:10px;" size="small" type="denger" @click="cancel(item)">取消</el-button>
              <el-button v-show="item.isChangeStatus" size="small" type="primary" @click="suerStatus(item)">确定</el-button>
            </div>
            <div v-if="item.data[0].status == '1' || item.data[0].status == '2'" class="order-time" style="cursor:pointer" @click="changeOrderStatus(item)"><i class="el-icon-edit"></i>更改状态</div>
          </li>
          <li style="padding: 0 26px;">
            <div>收件人地址：</div>
            <div style="text-indent: 30px;">收件人： {{item.address.name}}</div>
            <div style="text-indent: 30px;">手机号： {{item.address.phoneNum}}</div>
            <div style="text-indent: 30px;">地址： {{item.address.content}}</div>
          </li>
          <li class="header">
            <div class="pro-img"></div>
            <div class="pro-name">商品名称</div>
            <div class="pro-price">单价</div>
            <div class="pro-num">数量</div>
            <div class="pro-total">小计</div>
          </li>
          <!-- 我的订单表头END -->

          <!-- 订单列表 -->
          <li class="product-list" v-for="(product,i) in item.data" :key="i">
            <div class="pro-img">
              <router-link :to="{ path: '/goods/details', query: {productID:product.product_id} }">
                <img :src="$target + product.product_picture" />
              </router-link>
            </div>
            <div class="pro-name">
              <router-link
                :to="{ path: '/goods/details', query: {productID:product.product_id} }"
              >{{product.product_name}}</router-link>
            </div>
            <div class="pro-price">{{product.product_price}}元</div>
            <div class="pro-num">{{product.product_num}}</div>
            <div class="pro-total pro-total-in">{{product.product_price*product.product_num}}元</div>
          </li>
        </ul>
        <div class="order-bar">
          <div class="order-bar-left">
            <span class="order-total">
              共
              <span class="order-total-num">{{total[index].totalNum}}</span> 件商品
            </span>
          </div>
          <div class="order-bar-right">
            <span>
              <span class="total-price-title">合计：</span>
              <span class="total-price">{{total[index].totalPrice}}元</span>
            </span>
          </div>
          <!-- 订单列表END -->
        </div>
      </div>
      <div style="margin-top:-40px;"></div>
    </div>
    <!-- 我的订单主要内容END -->

    <!-- 订单为空的时候显示的内容 -->
    <div v-else class="order-empty">
      <div class="empty">
        <h2>您的订单还是空的！</h2>
        <p>快去购物吧！</p>
      </div>
    </div>
    <!-- 订单为空的时候显示的内容END -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      orders: [], // 订单列表
      total: [], // 每个订单的商品数量及总价列表
      isChangeStatus: false,
      options: [],
      orderStatus: ''
    };
  },
  activated() {
    this.getList()
  },
  watch: {
    // 通过订单信息，计算出每个订单的商品数量及总价
    orders: function(val) {
      console.log(val)
      let total = [];
      for (let i = 0; i < val.length; i++) {
        const element = val[i];

        let totalNum = 0;
        let totalPrice = 0;
        for (let j = 0; j < element.data.length; j++) {
          const temp = element.data[j];
          totalNum += temp.product_num;
          totalPrice += temp.product_price * temp.product_num;
        }
        total.push({ totalNum, totalPrice });
      }
      this.total = total;
    }
  },
  methods: {
    getList() {
      // 获取订单数据
      this.$axios
        .post("/api/user/order/getOrder", {
          user_id: this.$store.getters.getUser.user_id
        })
        .then(res => {
          if (res.data.code === "001") {
            this.orders = res.data.orders;
            this.orders.forEach(item => {
              item.isChangeStatus = false
            })
          } else {
            this.notifyError(res.data.msg);
          }
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    cancel(item) {
      this.orderStatus = ''
      item.isChangeStatus = !item.isChangeStatus
    },
    suerStatus(item) {
      this.$axios.post('/api/user/order/changeStatus', {
        order_id: item.data[0].order_id,
        status: this.orderStatus
      })
        .then(res => {
          console.log(res)
          if (res.data.code == '001') {
            item.isChangeStatus = false
            this.getList()
            this.notifySucceed(res.data.msg)
          } else {
            this.notifyError(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeOrderStatus(item) {
      const status = item.data[0].status
      if (this.options.length != 0) {
        this.options = []
      } else {
        if (status == '1') {
          this.options = []
          this.options.push({
            label: '申请退款',
            value: '3'
          })
        }
        if (status == '2') {
          this.options = []
          this.options.push({
            label: '申请退款',
            value: '3'
          })
        }
      }
      item.isChangeStatus = !item.isChangeStatus
    }
  }
};
</script>
<style scoped>
.order {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 我的订单头部CSS */
.order .order-header {
  height: 64px;
  border-bottom: 2px solid #ff6700;
  background-color: #fff;
  margin-bottom: 20px;
}
.order .order-header .order-header-content {
  width: 1225px;
  margin: 0 auto;
}
.order .order-header p {
  font-size: 28px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}
/* 我的订单头部CSS END */
.order .content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 50px;
}

.order .content ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}
/* 我的订单表头CSS */
.order .content ul .order-info {
  height: 60px;
  line-height: 60px;
  padding: 0 26px;
  color: #424242;
  border-bottom: 1px solid #f5f5f5;
}
.order .content ul .order-status {
  height: 60px;
  line-height: 60px;
  padding: 0 26px;
  color: #333;
  border-bottom: 1px solid #ff6700;
}
.order .content ul .order-info .order-id,
.order .content ul .order-status .order-id {
  float: left;
  color: #ff6700;
}
.order .content ul .order-info .order-time,
.order .content ul .order-status .order-time {
  float: right;
}

.order .content ul .header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}
/* 我的订单表头CSS END */

/* 订单列表CSS */
.order .content ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}
.order .content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
  padding-left: 80px;
}
.order .content ul .pro-img img {
  height: 80px;
  width: 80px;
}
.order .content ul .pro-name {
  float: left;
  width: 380px;
}
.order .content ul .pro-name a {
  color: #424242;
}
.order .content ul .pro-name a:hover {
  color: #ff6700;
}
.order .content ul .pro-price {
  float: left;
  width: 160px;
  padding-right: 18px;
  text-align: center;
}
.order .content ul .pro-num {
  float: left;
  width: 190px;
  text-align: center;
}
.order .content ul .pro-total {
  float: left;
  width: 160px;
  padding-right: 81px;
  text-align: right;
}
.order .content ul .pro-total-in {
  color: #ff6700;
}

.order .order-bar {
  width: 1185px;
  padding: 0 20px;
  border-top: 1px solid #ff6700;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
.order .order-bar .order-bar-left {
  float: left;
}
.order .order-bar .order-bar-left .order-total {
  color: #757575;
}
.order .order-bar .order-bar-left .order-total-num {
  color: #ff6700;
}
.order .order-bar .order-bar-right {
  float: right;
}
.order .order-bar .order-bar-right .total-price-title {
  color: #ff6700;
  font-size: 14px;
}
.order .order-bar .order-bar-right .total-price {
  color: #ff6700;
  font-size: 30px;
}
/* 订单列表CSS END */

/* 订单为空的时候显示的内容CSS */
.order .order-empty {
  width: 1225px;
  margin: 0 auto;
}
.order .order-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/imgs/cart-empty.png) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.order .order-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.order .order-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* 订单为空的时候显示的内容CSS END */
</style>