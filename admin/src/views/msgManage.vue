<template>
  <div>
    <div class="title">
      留言管理:
    </div>
    <div style="margin-top: 10px;width: 300px;float: right;">
      <el-input placeholder="请输入搜索内容" v-model="searchKey">
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
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="answer"
        label="回复内容">
      </el-table-column>
      <el-table-column
        prop="answerTime"
        label="回复时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.answer"
            @click.native.prevent="answerEvent(scope)"
            type="text"
            size="middle"
            style="margin-right: 15px;">
            回复
          </el-button>
        </template>
      </el-table-column>
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
    <el-dialog
      title="提示"
      :close-on-click-modal="false"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <el-input :rows="5" type="textarea" v-model="answer" maxlength="500" show-word-limit></el-input>
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
      cp: 1,
      total: 1,
      userInfo: {},
      centerDialogVisible: false,
      answer: '',
      id: '',
      searchKey: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    answerEvent(scope) {
      this.answer = ''
      this.id = scope.row.id
      this.centerDialogVisible = true
    },
    sureAnswer() {
      if (this.answer=='' ) {
        this.$message.error('回复内容不能为空')
        return
      }
      this.$axios.post('/api/message/answer', {
        id: this.id,
        answer: this.answer
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
      this.$axios.post('/api/message/getAdminList', {
        cp: this.cp,
        searchKey: this.searchKey
      })
        .then(res => {
          this.tableData = res.data.data.data
          this.tableData.forEach(item => {
            item.answerTime = (item.answerTime.split('.')[0]).replace('T', '')
            item.createTime = (item.createTime.split('.')[0]).replace('T', '')
          })
          this.total = res.data.data.total
        })
    },
    // 改变页码
    changeCP(index) {
      this.cp = index
      this.getList()
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