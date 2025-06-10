<template>
  <div class="container">
    <div class="content">
      <h3 style="text-align:center;">管理员登录</h3>
      <el-form ref="form" :model="form">
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      if (this.form.account == '') {
        this.$message.error('账号不能为空')
      }
      if (this.form.password == '') {
        this.$message.error('密码不能为空')
      }
      this.$axios.post('/api/admin/login', {
        account: this.form.account,
        password: this.form.password
      })
        .then(res => {
          if (res.data.code == '001') {
            localStorage.setItem('adminUserInfo', res.data.data)
            this.$message.success('登录成功')
            this.$router.push('/')
          } else {
            this.$message.error(res.data.msg)
          }
        })
    }
  }
}
</script>
<style scoped>
.container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../assets/bj.jpg) no-repeat center center;
  background-size: cover;
}
.content {
  padding: 20px;
  
  width: 400px;
  border-radius: 5px;
  box-shadow: 0 0 7px #eee;
}
.el-form-item__content button {
  width: 100%;
}

</style>