<template>
  <div class="statistics">
    <div class="title">
      数据统计:
    </div>
    <div>
      <el-row style="margin-bottom: 3px;">
        <el-col :span="12" style="padding-right: 3px;">
          <div class="box" style="width: 100%;text-align: center;background-color: #eee;padding:20px;box-sizing: border-box;">
            <p style="font-size: 18px;font-weight:bold;margin-bottom: 20px;text-align:center">用户总数</p>
            <p style="font-size: 18px;margin-bottom: 20px;text-align:center;color: blue;">{{data.userCount}}</p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="box" style="width: 100%;text-align: center;background-color: #eee;padding:20px;box-sizing: border-box;">
          <p style="font-size: 18px;font-weight:bold;margin-bottom: 20px;text-align:center">订单总数</p>
          <p style="font-size: 18px;margin-bottom: 20px;text-align:center;color: blue;">{{data.orderCount}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" style="padding-right: 3px;">
          <div class="box" style="width: 100%;text-align: center;background-color: #eee;padding:20px;box-sizing: border-box;">
            <p style="font-size: 18px;font-weight:bold;margin-bottom: 20px;text-align:center">产品总数</p>
            <p style="font-size: 18px;margin-bottom: 20px;text-align:center;color:blue;">{{data.productCount}}</p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="box" style="width: 100%;text-align: center;background-color: #eee;padding:20px;box-sizing: border-box;">
          <p style="font-size: 18px;font-weight:bold;margin-bottom: 20px;text-align:center">留言总数</p>
          <p style="font-size: 18px;margin-bottom: 20px;text-align:center;color: blue;">{{data.messageCount}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        userCount: 0,
        orderCount: 0,
        productCount: 0,
        messageCount: 0
      }
    }
  },
  created() {
    this.$axios.post('/api/statistics/getCount')
      .then(res => {
        this.data = res.data.data
      })
  },
  methods: {

  }
}
</script>

<style>
  .statistics .title {
    font-size: 18px;
    font-weight: bold;
    padding-left: 10px;
    padding-bottom: 20px;
  };
  .statistics .box {
    width: 100%;
    text-align: center;
    background-color: #eee;
  };
  .statistics .box p:first-child {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    color: red;
  }
</style>