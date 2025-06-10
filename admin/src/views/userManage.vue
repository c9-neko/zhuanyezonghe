<template>
  <div>
    <div class="title">
      用户管理:
    </div>
    
    <div style="display:flex;justify-content:flex-end;">
      <div style="width: 300px;margin-right: 20px;">
        <el-input placeholder="请输入内容搜索" v-model="searchKey">
          <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
        </el-input>
      </div>
      <el-button @click="addUser" type="primary" size="middle">新增用户</el-button>
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
        prop="userName"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userPhoneNumber"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="roleType"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <!-- <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editor(scope)"
            type="text"
            size="middle"
            style="margin-right: 15px;">
            编辑
          </el-button>
          <el-button type="text" size="middle" @click="_delete(scope)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div style="text-align:right;margin-top:15px;">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changeCP"
        @prev-click="changeCP"
        @next-click="changeCP"
        :total="total">
      </el-pagination>
    </div>
    <register @fromChild="registerCallback" :userInfo="userInfo" @addSuccess="addSuccess" :register="register"></register>
  </div>
</template>

<script>
import register from '../components/register'
export default {
  components: {
    register
  },
  data() {
    return {
      tableData: [],
      cp: 1,
      total: 1,
      register: false,
      userInfo: {},
      searchKey: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    registerCallback(val) {
      this.register = val
    },
    // 获取用户列表
    getList() {
      this.$axios.post('/api/admin/getAllUser', {
        cp: this.cp,
        searchKey: this.searchKey
      })
        .then(res => {
          this.tableData = res.data.data.data
          this.total = res.data.data.total
        })
    },
    // 改变页码
    changeCP(index) {
      this.cp = index
      this.getList()
    },
    // 新增用户
    addUser() {
      this.register = true
    },
    // 新增/编辑用户成功回调
    addSuccess() {
      this.register = false
      this.getList()
    },
    // 编辑用户
    editor(row) {
      console.log(row)
      this.userInfo = {
        id: row.row.user_id,
        account: row.row.userName,
        password: row.row.password,
        phoneNum: row.row.userPhoneNumber,
        email: row.row.email
      }
      this.register = true
    },
    _delete(row) {
      this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(1111)
          this.$axios.post('/api/admin/deleteUser', {
            user_id: row.row.user_id
          })
            .then(res => {
              if (res.data.code == '001') {
                this.notifySucceed(res.data.msg)
                this.getList()
              } else {
                this.notifyError(res.data.msg)
              }
            })
        }).catch(() => {});
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