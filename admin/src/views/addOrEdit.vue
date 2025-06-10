<template>
  <div>
    <div class="addOrEditTitle">{{title}}</div>
    <div>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="product_name">
          <el-input :disabled="$route.query.type=='detail'" v-model="form.product_name"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" prop="category_id">
          <el-select :disabled="$route.query.type=='detail'" v-model="form.category_id" placeholder="请选择商品类别">
            <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品标题" prop="product_title">
          <el-input :disabled="$route.query.type=='detail'" v-model="form.product_title"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="product_intro">
          <el-input :disabled="$route.query.type=='detail'" v-model="form.product_intro"></el-input>
        </el-form-item>
        <el-form-item label="商品原价" prop="product_price">
          <el-input :disabled="$route.query.type=='detail'" v-model="form.product_price"></el-input>
        </el-form-item>
        <el-form-item label="商品现价" prop="product_selling_price">
          <el-input :disabled="$route.query.type=='detail'" v-model="form.product_selling_price"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="product_num">
          <el-input :disabled="$route.query.type=='detail'" type="number" v-model="form.product_num"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="product_picture">
          <el-upload
            :disabled="$route.query.type=='detail'"
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.product_picture" :src="'http://localhost:3000/'+form.product_picture" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$route.query.type!='detail'" type="primary" @click="onSubmit('ruleForm')">{{$route.query.id?'保存':'新增'}}</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '添加商品',
      form: {
        product_name: '',
        category_id: '',
        product_title: '',
        product_intro: '',
        product_picture: '',
        product_price: '',
        product_selling_price: '',
        product_num: '',
        product_sales: ''
      },
      rules: {
        product_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        category_id: [
          { required: true, message: '请选择商品类别', trigger: 'blur' }
        ],
        product_title: [
          { required: true, message: '请输入商品标题', trigger: 'blur' }
        ],
        product_intro: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ],
        product_picture: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        product_price: [
          { required: true, message: '请输入原价', trigger: 'blur' }
        ],
        product_selling_price: [
          { required: true, message: '请输入现价', trigger: 'blur' }
        ],
        product_num: [
          { required: true, message: '请输入库存', trigger: 'blur' }
        ]
      },
      options: []
    }
  },
  created() {
    this.getCategoryList()
    if (this.$route.query.type != 'add' && this.$route.query.id) {
      this.title = '编辑商品'
      this.getInfo()
    } else {
      this.title = '添加商品'
    }
  },
  methods: {
    // 获取商品分类列表
    getCategoryList() {
      this.$axios.post('/api/product/getCategory')
        .then(res => {
          this.options = []
          res.data.category.forEach(item => {
            this.options.push({
              value: item.category_id,
              label: item.category_name
            })
          })
        })
    },
    // 获取详情
    getInfo() {
      this.$axios.post('/api/product/getDetailByAdmin', {
        id: this.$route.query.id
      })
        .then(res => {
          if (res.data.code == '001') {
            console.log(1)
            this.form = {
              product_name: res.data.Product[0].product_name,
              category_id: res.data.Product[0].category_id,
              product_title: res.data.Product[0].product_title,
              product_intro: res.data.Product[0].product_intro,
              product_picture: res.data.Product[0].product_picture,
              product_price: res.data.Product[0].product_price,
              product_selling_price: res.data.Product[0].product_selling_price,
              product_num: res.data.Product[0].product_num,
              product_sales: res.data.Product[0].product_sales
            }
          } else {
            this.notifyError(res.data.msg)
          }
        })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (valid) {
            const params = {
              product_name: this.form.product_name,
              category_id: this.form.category_id,
              product_title: this.form.product_title,
              product_intro: this.form.product_intro,
              product_picture: this.form.product_picture,
              product_price: this.form.product_price,
              product_selling_price: this.form.product_selling_price,
              product_num: this.form.product_num
            }
            if (this.$route.query.id) {
              params['product_id'] = this.$route.query.id
              params['product_sales'] = this.form.product_sales
            }
            this.$axios.post(this.$route.query.id?'/api/product/editProduct':'/api/product/addProduct', params) 
              .then(res => {
                if (res.data.code == '001') {
                  this.$message.success(res.data.msg)
                  history.go(-1)
                } else {
                  this.$message.error(res.data.msg)
                }
              })
          }
        } else {
          return false;
        }
      });
    },
    beforeAvatarUpload(file) {
      const params = new FormData()
      params.append('file', file)
      if (this.$route.query.id) {
        params.append('id', this.$route.query.id)
      }
      this.$axios.post('/api/product/uploadProductPicture', params, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(res => {
          if (res.data.code == '001') {
            this.form.product_picture = res.data.data.product_picture
            this.notifySuccess(res.data.msg)
          } else {
            this.notifyError(res.data.msg)
          }
        })
    },
    // 返回
    back() {
      history.go(-1)
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload{
    border: 1px dotted rgba(0,0,0,0.3);
    border-radius: 5px;
  }
</style>
<style scoped>
.addOrEditTitle {
  font-size: 18px;
  text-align: center;
  width: 100%;
  font-weight: bold;
  color: #333;
  padding-bottom: 20px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>