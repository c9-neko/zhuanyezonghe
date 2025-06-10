<!--
 * @Description: 用户注册组件
 -->
<template>
  <div id="register">
    <el-dialog :close-on-click-modal="false" :title="'id' in userInfo?'编辑用户':'新增用户'" width="300px" center :visible.sync="isRegister">
      <el-form
        :model="RegisterUser"
        :rules="rules"
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入账号"
            v-model="RegisterUser.name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phoneNum">
          <el-input
            prefix-icon="el-icon-mobile-phone"
            placeholder="请输入手机号"
            v-model="RegisterUser.phoneNum"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            prefix-icon="el-icon-mobile-phone"
            placeholder="请输入邮箱"
            v-model="RegisterUser.email"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请输入密码"
            v-model="RegisterUser.pass"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请再次输入密码"
            v-model="RegisterUser.confirmPass"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="Register" style="width:100%;">{{'id' in userInfo ? '保存' : '新增'}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MyRegister",
  props: ["register", 'userInfo'],
  data() {
    // 用户名的校验方法
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
      const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
      if (userNameRule.test(value)) {
        //判断数据库中是否已经存在该用户名
        if (this.RegisterUser.id) {
          return callback()
        }
        this.$axios
          .post("/api/users/findUserName", {
            userName: this.RegisterUser.name
          })
          .then(res => {
            // “001”代表用户名不存在，可以注册
            if (res.data.code == "001") {
              this.$refs.ruleForm.validateField("checkPass");
              return callback();
            } else {
              return callback(new Error(res.data.msg));
            }
          })
          .catch(err => {
            return Promise.reject(err);
          });
      } else {
        return callback(new Error("字母开头,长度5-16之间,允许字母数字下划线"));
      }
    };
    // 密码的校验方法
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      // 密码以字母开头,长度在6-18之间,允许字母数字和下划线
      const passwordRule = /^[a-zA-Z]\w{5,17}$/;
      if (passwordRule.test(value)) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(
          new Error("字母开头,长度6-18之间,允许字母数字和下划线")
        );
      }
    };
    // 确认密码的校验方法
    let validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入确认密码"));
      }
      // 校验是否以密码一致
      if (this.RegisterUser.pass != "" && value === this.RegisterUser.pass) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("两次输入的密码不一致"));
      }
    };
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
    };
    let validateEmail = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请输入邮箱号'))
      } else {
        if (!(/@/g.test(value))) {
          return callback(new Error('请输入正确的手机号'))
        } else {
          return callback()
        }
      }
    }
    return {
      isRegister: false, // 控制注册组件是否显示
      RegisterUser: {
        name: "",
        pass: "",
        confirmPass: "",
        phoneNum: "",
        email: '',
        id: ''
      },
      // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        confirmPass: [{ validator: validateConfirmPass, trigger: "blur" }],
        phoneNum: [{ validator: validatePhoneNum, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }]
      }
    };
  },
  watch: {
    // 监听父组件传过来的register变量，设置this.isRegister的值
    register: function(val) {
      if (val) {
        this.isRegister = val;
      }
    },
    // 监听this.isRegister变量的值，更新父组件register变量的值
    isRegister: function(val) {
      if (!val) {
        this.$refs["ruleForm"].resetFields();
        this.$emit("fromChild", val);
      }
    },
    userInfo: function(val) {
      if (val) {
        this.RegisterUser.name = val.account
        this.RegisterUser.pass = val.password
        this.RegisterUser.phoneNum = val.phoneNum
        this.RegisterUser.email = val.email
        this.RegisterUser.id = val.id
        this.RegisterUser.confirmPass = val.password
      }
    }
  },
  methods: {
    Register() {
      console.log(this.RegisterUser)
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate(valid => {
        //如果通过校验开始注册
        if (valid) {
          let api = ''
          let params = {}
          let notice = ''
          console.log(this.RegisterUser)
          if (this.RegisterUser.id) {
            api = '/api/admin/updateUser'
            params = {
              userName: this.RegisterUser.name,
              password: this.RegisterUser.pass,
              phoneNum: this.RegisterUser.phoneNum,
              email: this.RegisterUser.email,
              roleType: 'admin',
              user_id: this.RegisterUser.id
            }
            notice = '编辑成功'
          } else {
            api = '/api/users/register'
            params = {
              userName: this.RegisterUser.name,
              password: this.RegisterUser.pass,
              phoneNum: this.RegisterUser.phoneNum,
              email: this.RegisterUser.email,
              roleType: 'admin'
            }
            notice = '新增成功'
          }
          this.$axios
            .post(api, params)
            .then(res => {
              // “001”代表注册成功，其他的均为失败
              if (res.data.code === "001") {
                // 隐藏注册组件
                this.isRegister = false;
                // 弹出通知框提示注册成功信息
                this.notifySucceed(notice);
                this.$emit('addSuccess')
              } else {
                // 弹出通知框提示注册失败信息
                this.notifyError(res.data.msg);
              }
            })
            .catch(err => {
              return Promise.reject(err);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style>
</style>