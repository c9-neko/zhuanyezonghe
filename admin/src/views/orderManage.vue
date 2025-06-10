<template>
  <div>
    <div class="title">
      订单管理:
    </div>
    <div style="margin-top: 10px;width: 300px;float: right;">
      <el-input placeholder="请输入订单id搜索" v-model="searchKey">
        <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
      </el-input>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        label="序号"
        width="80"
        type="index">
      </el-table-column>
      <el-table-column
        prop="orderId"
        label="订单id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="orderTime"
        label="订单创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="总金额">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名">
      </el-table-column>
      <el-table-column
        label="订单状态">
        <template
          slot-scope="scope"
        >
          {{scope.row.status == '1' ? '未发货' : ''}}
          {{scope.row.status == '2' ? '已发货' : ''}}
          {{scope.row.status == '3' ? '申请退款' : ''}}
          {{scope.row.status == '4' ? '订单关闭' : ''}}
          {{scope.row.status == '5' ? '交易完成' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
          v-if="scope.row.status=='1' || scope.row.status=='3'"
            @click.native.prevent="changeOrderStatus(scope)"
            type="text"
            size="middle"
            style="margin-right: 15px;">
            更改订单状态
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :close-on-click-modal="false"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <div style="text-align:center">
        <el-select v-model="orderStatus" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAnswer">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      centerDialogVisible: false,
      row: '',
      orderStatus: '',
      options: [],
      searchKey: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    changeOrderStatus(row) {
      this.row = row.row
      if (this.row.status == '1') {
        this.options = []
        this.options.push({
          value: '2',
          label: '已发货'
        })
      }
      if (this.row.status == '3') {
        this.options = []
        this.options.push({
          value: '4',
          label: '交易关闭'
        })
      }
      this.centerDialogVisible = true
    },
    sureAnswer() {
      if (this.orderStatus=='' ) {
        this.$message.error('状态不能为空')
        return
      }
      this.$axios.post('/api/user/order/changeStatus', {
        order_id: this.row.orderId,
        status: this.orderStatus
      })
        .then(res => {
          if (res.data.code == '001') {
            this.notifySucceed(res.data.msg)
            this.centerDialogVisible = false
            this.getList()
          } else{
            this.notifyError(res.data.msg)
            this.centerDialogVisible = false
          }
        })
    },
    // 获取用户列表
    getList() {
      this.$axios.post('/api/user/order/getOrderList', {
        searchKey: this.searchKey
      })
        .then(res => {
          this.tableData = res.data.data
        })
    }
  }
}
</script>

<style scoped>
  .title {
    font-size: 18px;
    font-weight: bold;
    padding-left: 10px;
    padding-bottom: 20px;
  };
</style>