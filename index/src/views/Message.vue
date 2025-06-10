<template>
  <div class="message">
    <div class="message-header">
      <div class="message-title">
        <i class="el-icon-tickets" style="color: #ff6700;"></i>
        留言板
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" size="middle" @click="addMessage">添加留言</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        label="标题"
        width="250">
        <template slot-scope="scope">
          <div class="title" v-text="scope.row.title"></div>
        </template>
      </el-table-column>
      <el-table-column
        label="内容">
        <template slot-scope="scope">
          <div class="content" v-text="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        width="100"
        label="是否回复">
        <template slot-scope="scope">
          {{ scope.row.answer ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="readDetail(scope)"
          type="text"
          size="middle"
          style="margin-right: 15px;">
          查看
        </el-button>
        <el-button
          v-if="!scope.row.answer"
          @click.native.prevent="editor(scope)"
          type="text"
          size="middle"
          style="margin-right: 15px;">
          编辑
        </el-button>
        <el-button @click="_delete(scope)" type="text" size="middle">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="pagination">
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
      :title="messageTitle"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="() => {dialogVisible=false}">
      <el-form
        :model="message"
        :rules="rules"
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="title">
          <el-input
            placeholder="请输标题"
            v-model="message.title"
          ></el-input>
        </el-form-item>
        <el-form-item prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 10}"
            placeholder="请输入内容"
            v-model="message.content">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      title="留言详情"
      :visible.sync="readDetailStatus"
      width="600px"
      :before-close="() => {readDetailStatus=false}">
      <p class="messageTitle" v-text="selfMessage.title"></p>
      <div class="item">
        <p v-text="selfName+'：'"></p>
        <p v-text="selfMessage.content"></p>
        <p v-text="selfMessage.createTime"></p>
      </div>
      <el-divider></el-divider>
      <div class="item" v-if="selfMessage.answer">
        <p>官方回复：</p>
        <p v-text="selfMessage.answer"></p>
        <p v-text="selfMessage.answerTime"></p>
      </div>
      <el-divider v-if="selfMessage.answer"></el-divider>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isRegister: false, // 控制注册组件是否显示
      message: {
        title: "",
        content: "",
        id: ''
      },
      readDetailStatus: false,
      // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'bulr' }],
        content: [{ required: true, message: '请输入留言内容', trigger: 'bulr' }],
      },
      total: 0,
      messageTitle: '添加留言',
      dialogVisible: false,
      tableData: [],
      cp: 1,
      selfName: '',
      selfMessage: {
        content: '',
        createTime: '',
        answer: '',
        title: '',
        answerTime: ''
      }
    }
  },
  activated() {
    this.getMessageList()
  },
  methods: {
    // 获取列表
    getMessageList() {
      this.$axios
          .post("/api/message/getSelfList", {
            cp: this.cp,
            user_id: JSON.parse(localStorage.getItem('user')).user_id
          })
          .then(res => {
            this.tableData = res.data.data.data
            this.tableData.forEach(item => {
              item.createTime = (item.createTime.split('.')[0]).replace('T', ' ')
              item.answerTime = item.answerTime ? (item.answerTime.split('.')[0]).replace('T', ' ') : ''
            })
            this.total = res.data.data.total
          })
          .catch(err => {
            console.log(err)
          })
    },
    // 当前页码
    changeCP(val) {
      this.cp = val
      this.getMessageList()
    },
    // 添加留言
    addMessage() {
      this.messageTitle = '添加留言'
      this.dialogVisible = true
    },
    // 编辑留言
    editor(row) {
      this.messageTitle = '编辑留言'
      this.message.title = row.row.title
      this.message.content = row.row.content
      this.message.id = row.row.id
      this.dialogVisible = true
    },
    // 删除
    _delete(row) {
      console.log(row)
      this.$confirm('该操作将删除该留言，确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$axios.post('/api/message/delete', {
            id: row.row.id
          })
            .then(res => {
              if (res.data.code == '001') {
                this.getMessageList()
                this.notifySucceed(res.data.msg)
              } else {
                this.notifyError(res.data.msg)
              }
            })
            .catch(err =>{
              this.notifyError(err.message)
            })
        })
        .catch(()=>{})
    },
    // 查看详情
    readDetail(row) {
      this.selfMessage.content = row.row.content
      this.selfMessage.title = row.row.title
      this.selfMessage.answer = row.row.answer
      this.selfMessage.createTime = row.row.createTime
      this.selfMessage.answerTime = row.row.answerTime
      this.selfName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userName : ''
      this.readDetailStatus = true
    },
    // 关闭之前
    handleClose() {
      this.dialogVisible = false
    },
    dialogSure() {
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.messageTitle == '添加留言') {
            this.$axios
              .post("/api/message/addMessage", {
                title: this.message.title,
                content: this.message.content,
                user_id: JSON.parse(localStorage.getItem('user')).user_id
              })
              .then(res => {
                if (res.data.code == '001') {
                  this.getMessageList()
                  this.dialogVisible = false
                  this.message.title = ''
                  this.message.content = ''
                  this.notifySucceed(res.data.msg);
                } else {
                  this.notifyError(res.data.msg);
                }
              })
              .catch(err => {
                this.notifyError(err.message);
              })
          } else if (this.messageTitle == '编辑留言') {
            this.$axios
              .post("/api/message/update", {
                title: this.message.title,
                content: this.message.content,
                id: this.message.id
              })
              .then(res => {
                if (res.data.code == '001') {
                  this.getMessageList()
                  this.dialogVisible = false
                  this.message.title = ''
                  this.message.content = ''
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
    }
  }
}
</script>
<style scoped>
  .message {
    width: 1225px;
    margin: 0 auto;
    padding-bottom: 10px;
  }
  .message .message-header {
    height: 64px;
    background-color: #fff;
    border-bottom: 2px solid #ff6700;
  }
  .message .message-header .message-title {
    width: 1225px;
    margin: 0 auto;
    height: 64px;
    line-height: 64px;
    font-size: 28px;
  }
  .btn{
    text-align: right;
    padding-top: 20px;
    padding-bottom: 10px;
  }
  .pagination {
    text-align: right;
    padding-top: 20px;
  }
  .content {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .messageTitle {
    width: 90%;
    word-break: break-all;
    text-align: center;
    font-weight: bolder;
    font-size: 20px;
    padding-bottom: 20px;
  }
  .item {
    background-color: #f5f5f5;
    padding: 10px;
  }
  .item p:first-child {
    font-size: 16px;
    color: lightseagreen;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .item p:nth-child(2) {
    font-size: 16px;
    text-indent: 32px;
    word-break: break-all;
    color: #333;
    padding-bottom: 10px;
  }
  .item p:last-child {
    text-align: right;
    font-size: 15px;
    color: #aaa;
  }
</style>