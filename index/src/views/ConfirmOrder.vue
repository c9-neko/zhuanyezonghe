<!--
 * @Description: 确认订单页面组件
 -->
<template>
  <div class="confirmOrder">
    <!-- 头部 -->
    <div class="confirmOrder-header">
      <div class="header-content">
        <p>
          <i class="el-icon-s-order"></i>
        </p>
        <p>确认订单</p>
        <router-link to></router-link>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容容器 -->
    <div class="content">
      <!-- 选择地址 -->
      <div class="section-address">
        <p class="title">收货地址</p>
        <div class="address-body">
          <ul>
            <li
              style="position:relative"
              :class="item.id == confirmAddress ? 'in-section' : ''"
              v-for="item in addressList"
              :key="item.id"
              @click="chooseAddress(item.id)"
            >
              <i v-if="item.id == confirmAddress" style="color: red;position: absolute;right: 15px;top: 15px;margin-right:30px;" @click="editAddress(item)" class="el-icon-edit"></i>
              <!-- <i style="color: greed;position: absolute;right: 15px;top: 15px;" @click="deleteAddress(item)" class="el-icon-close"></i> -->
              <h2>{{item.name}}</h2>
              <p class="phone">{{item.phoneNum}}</p>
              <p class="address">{{item.content}}</p>
            </li>
            <li v-if="addressList.length < 6" class="add-address" @click="addAddress">
              <i class="el-icon-circle-plus-outline"></i>
              <p>添加新地址</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 选择地址END -->

      <!-- 商品及优惠券 -->
      <div class="section-goods">
        <p class="title">商品及优惠券</p>
        <div class="goods-list">
          <ul>
            <li v-for="item in getCheckGoods" :key="item.id">
              <img :src="$target + item.productImg" />
              <span class="pro-name">{{item.productName}}</span>
              <span class="pro-price">{{item.price}}元 x {{item.num}}</span>
              <span class="pro-status"></span>
              <span class="pro-total">{{item.price * item.num}}元</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品及优惠券END -->

      <!-- 配送方式 -->
      <div class="section-shipment">
        <p class="title">配送方式</p>
        <p class="shipment">包邮</p>
      </div>
      <!-- 配送方式END -->

      <!-- 发票 -->
      <div class="section-invoice">
        <p class="title">发票</p>
        <p class="invoice">电子发票</p>
        <p class="invoice">个人</p>
        <p class="invoice">商品明细</p>
      </div>
      <!-- 发票END -->

      <!-- 结算列表 -->
      <div class="section-count">
        <div class="money-box">
          <ul>
            <li>
              <span class="title">商品件数：</span>
              <span class="value">{{getCheckNum}}件</span>
            </li>
            <li>
              <span class="title">商品总价：</span>
              <span class="value">{{getTotalPrice}}元</span>
            </li>
            <li>
              <span class="title">活动优惠：</span>
              <span class="value">-0元</span>
            </li>
            <li>
              <span class="title">优惠券抵扣：</span>
              <span class="value">-0元</span>
            </li>
            <li>
              <span class="title">运费：</span>
              <span class="value">0元</span>
            </li>
            <li class="total">
              <span class="title">应付总额：</span>
              <span class="value">
                <span class="total-price">{{getTotalPrice}}</span>元
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 结算列表END -->

      <!-- 结算导航 -->
      <div class="section-bar">
        <div class="btn">
          <router-link to="/shoppingCart" class="btn-base btn-return">返回购物车</router-link>
          <a href="javascript:void(0);" @click="addOrder" class="btn-base btn-primary">结算</a>
        </div>
      </div>
      <!-- 结算导航END -->
    </div>
    <!-- 主要内容容器END -->
    <el-dialog
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="() => {dialogVisible=false}">
      <el-form
        :model="address"
        :rules="rules"
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入收件人"
            v-model="address.name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phoneNum">
          <el-input
            prefix-icon="el-icon-mobile-phone"
            placeholder="请输入手机号"
            v-model="address.phoneNum"
          ></el-input>
        </el-form-item>
        <el-form-item prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 10}"
            placeholder="请输入内容"
            v-model="address.content">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "",
  data() {
    // 手机号校验方法
    let validatePhoneNum = ( rule, value, callback ) => {
      if (value == '') {
        return callback(new Error('请输入手机号'))
      } else {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('请输入正确的手机号'))
        } else {
          if (value.length != 11) {
            return callback(new Error('请输入正确的手机号'))
          } else {
            return callback()
          }
        }
      }
    }
    return {
      title: '新增地址',
      dialogVisible: false,
      address: {
        name: '',
        phoneNum: '',
        content: '',
        id: ''
      },
      rules: {
        name: [{ required: true, message: '请输入收件人', trigger: 'bulr' }],
        phoneNum: [{ validator: validatePhoneNum, trigger: "blur" }],
        content: [{ required: true, message: '请输入收货地址', trigger: 'bulr' }],
      },
      // 虚拟数据
      confirmAddress: '', // 选择的地址id
      // 地址列表
      addressList: []
    };
  },
  created() {
    // 如果没有勾选购物车商品直接进入确认订单页面,提示信息并返回购物车
    if (this.getCheckNum < 1) {
      this.notifyError("请勾选商品后再结算");
      this.$router.push({ path: "/shoppingCart" });
    }
    this.getAddressList()
  },
  computed: {
    // 结算的商品数量; 结算商品总计; 结算商品信息
    ...mapGetters(["getCheckNum", "getTotalPrice", "getCheckGoods"])
  },
  methods: {
    ...mapActions(["deleteShoppingCart"]),
    chooseAddress(id) {
      console.log(id)
      this.confirmAddress = id
    },
    getAddressList() {
      this.$axios.post('/api/user/address/getList', {
        user_id: JSON.parse(localStorage.getItem('user')).user_id
      })
        .then(res => {
          console.log(res)
          if (res.data.code == '001') {
            this.addressList = res.data.data
          } else {
            this.notifyError(res.data.msg)
          }
        })
        .catch(err =>{
          this.notifyError(err.message)
        })
    },
    dialogSure() {
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.title == '新增地址') {
            this.$axios
              .post("/api/user/addresss/addAddress", {
                name: this.address.name,
                phoneNum: this.address.phoneNum,
                content: this.address.content,
                user_id: JSON.parse(localStorage.getItem('user')).user_id
              })
              .then(res => {
                if (res.data.code == '001') {
                  this.getAddressList()
                  this.dialogVisible = false
                  this.address.title = ''
                  this.address.content = ''
                  this.address.phoneNum = ''
                  this.notifySucceed(res.data.msg);
                } else {
                  this.notifyError(res.data.msg);
                }
              })
              .catch(err => {
                this.notifyError(err.message);
              })
          } else if (this.title == '编辑地址') {
            this.$axios
              .post("/api/user/addresss/updateAddress", {
                name: this.address.name,
                phoneNum: this.address.phoneNum,
                content: this.address.content,
                id: this.address.id
              })
              .then(res => {
                if (res.data.code == '001') {
                  this.getAddressList()
                  this.dialogVisible = false
                  this.address.title = ''
                  this.address.content = ''
                  this.address.phoneNum = ''
                  this.address.id = ''
                  this.notifySucceed(res.data.msg);
                } else {
                  this.notifyError(res.data.msg);
                }
              })
              .catch(err => {
                this.notifyError(err.message);
              })
          }
          
        } else {
          return false;
        }
      })
    },
    addAddress() {
      this.title = '新增地址'
      this.dialogVisible = true
    },
    editAddress(val) {
      this.title = '编辑地址'
      this.address.id = val.id
      this.address.name = val.name
      this.address.phoneNum = val.phoneNum
      this.address.content = val.content
      this.dialogVisible = true
    },
    addOrder() {
      if (!this.confirmAddress) {
        this.notifyError('收件地址不能为空，请选择收获地址');
        return
      }
      this.$axios
        .post("/api/user/order/addOrder", {
          user_id: this.$store.getters.getUser.user_id,
          products: this.getCheckGoods,
          status: '1',
          addressId: this.confirmAddress
        })
        .then(res => {
          let products = this.getCheckGoods;
          switch (res.data.code) {
            // “001”代表结算成功
            case "001":
              for (let i = 0; i < products.length; i++) {
                const temp = products[i];
                // 删除已经结算的购物车商品
                this.deleteShoppingCart(temp.id);
              }
              // 提示结算结果
              this.notifySucceed(res.data.msg);
              // 跳转我的订单页面
              this.$router.push({ path: "/order" });
              break;
            default:
              // 提示失败信息
              this.notifyError(res.data.msg);
          }
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }
  }
};
</script>
<style scoped>
.confirmOrder {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 头部CSS */
.confirmOrder .confirmOrder-header {
  background-color: #fff;
  border-bottom: 2px solid #ff6700;
  margin-bottom: 20px;
}
.confirmOrder .confirmOrder-header .header-content {
  width: 1225px;
  margin: 0 auto;
  height: 80px;
}
.confirmOrder .confirmOrder-header .header-content p {
  float: left;
  font-size: 28px;
  line-height: 80px;
  color: #424242;
  margin-right: 20px;
}
.confirmOrder .confirmOrder-header .header-content p i {
  font-size: 45px;
  color: #ff6700;
  line-height: 80px;
}
/* 头部CSS END */

/* 主要内容容器CSS */
.confirmOrder .content {
  width: 1225px;
  margin: 0 auto;
  padding: 48px 0 0;
  background-color: #fff;
}

/* 选择地址CSS */
.confirmOrder .content .section-address {
  margin: 0 48px;
  overflow: hidden;
}
.confirmOrder .content .section-address .title {
  color: #333;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 20px;
}
.confirmOrder .content .address-body li {
  float: left;
  color: #333;
  width: 220px;
  height: 178px;
  border: 1px solid #e0e0e0;
  padding: 15px 24px 0;
  margin-right: 17px;
  margin-bottom: 24px;
}
.confirmOrder .content .address-body .in-section {
  border: 1px solid #ff6700;
}
.confirmOrder .content .address-body li h2 {
  font-size: 18px;
  font-weight: normal;
  line-height: 30px;
  margin-bottom: 10px;
}
.confirmOrder .content .address-body li p {
  font-size: 14px;
  color: #757575;
}
.confirmOrder .content .address-body li .address {
  padding: 10px 0;
  max-width: 180px;
  max-height: 88px;
  line-height: 22px;
  overflow: hidden;
}
.confirmOrder .content .address-body .add-address {
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .address-body .add-address i {
  font-size: 30px;
  padding-top: 50px;
  text-align: center;
}
/* 选择地址CSS END */

/* 商品及优惠券CSS */
.confirmOrder .content .section-goods {
  margin: 0 48px;
}
.confirmOrder .content .section-goods p.title {
  color: #333;
  font-size: 18px;
  line-height: 40px;
}
.confirmOrder .content .section-goods .goods-list {
  padding: 5px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.confirmOrder .content .section-goods .goods-list li {
  padding: 10px 0;
  color: #424242;
  overflow: hidden;
}
.confirmOrder .content .section-goods .goods-list li img {
  float: left;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.confirmOrder .content .section-goods .goods-list li .pro-name {
  float: left;
  width: 650px;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-price {
  float: left;
  width: 150px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-status {
  float: left;
  width: 99px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-total {
  float: left;
  width: 190px;
  text-align: center;
  color: #ff6700;
  line-height: 30px;
}
/* 商品及优惠券CSS END */

/* 配送方式CSS */
.confirmOrder .content .section-shipment {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .content .section-shipment .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .content .section-shipment .shipment {
  float: left;
  line-height: 38px;
  font-size: 14px;
  color: #ff6700;
}
/* 配送方式CSS END */

/* 发票CSS */
.confirmOrder .content .section-invoice {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .content .section-invoice .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .content .section-invoice .invoice {
  float: left;
  line-height: 38px;
  font-size: 14px;
  margin-right: 20px;
  color: #ff6700;
}
/* 发票CSS END */

/* 结算列表CSS */
.confirmOrder .content .section-count {
  margin: 0 48px;
  padding: 20px 0;
  overflow: hidden;
}
.confirmOrder .content .section-count .money-box {
  float: right;
  text-align: right;
}
.confirmOrder .content .section-count .money-box .title {
  float: left;
  width: 126px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #757575;
}
.confirmOrder .content .section-count .money-box .value {
  float: left;
  min-width: 105px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #ff6700;
}
.confirmOrder .content .section-count .money-box .total .title {
  padding-top: 15px;
}
.confirmOrder .content .section-count .money-box .total .value {
  padding-top: 10px;
}
.confirmOrder .content .section-count .money-box .total-price {
  font-size: 30px;
}
/* 结算列表CSS END */

/* 结算导航CSS */
.confirmOrder .content .section-bar {
  padding: 20px 48px;
  border-top: 2px solid #f5f5f5;
  overflow: hidden;
}
.confirmOrder .content .section-bar .btn {
  float: right;
}
.confirmOrder .content .section-bar .btn .btn-base {
  float: left;
  margin-left: 30px;
  width: 158px;
  height: 38px;
  border: 1px solid #b0b0b0;
  font-size: 14px;
  line-height: 38px;
  text-align: center;
}
.confirmOrder .content .section-bar .btn .btn-return {
  color: rgba(0, 0, 0, 0.27);
  border-color: rgba(0, 0, 0, 0.27);
}
.confirmOrder .content .section-bar .btn .btn-primary {
  background: #ff6700;
  border-color: #ff6700;
  color: #fff;
}
/* 结算导航CSS */

/* 主要内容容器CSS END */
</style>