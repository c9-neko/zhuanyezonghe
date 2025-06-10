<template>
  <div>
    <div class="addOrEditTitle">轮播图管理</div>
    <div>
      <el-upload
        class="upload-demo"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :file-list="fileList"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    beforeUpload(file) {
      let params = new FormData()
      params.append('file', file)
      this.$axios.post('/api/carousel/addImg', params,{headers: {'Content-Type': 'multipart/form-data'}})
        .then(res => {
          console.log(res)
          if (res.data.code == '001') {
            this.fileList.push({
              id: res.data.data.id,
              name: res.data.data.intro,
              url: 'http://localhost:3000/'+res.data.data.imgPath,
              status: "success"
            })
            this.notifySucceed(res.data.msg)
          } else {
            this.notifyError(res.data.msg)
          }
        })
    },
    // 删除图片
    handleRemove(file) {
      console.log(file)
      this.$axios.post('/api/carousel/deleteImg', {
        id: file.id
      })
        .then(res => {
          if (res.data.code == '001') {
            this.$notifySucceed(res.data.msg)
          } else {
            this.uploadImg(this.row)
            this.$notifyError(res.data.msg)
          }
        })
    },
    // 预览图片
    handlePreview(file) {
      window.open(file.url)
    },
    getList() {
      this.$axios.post('/api/carousel/getList') 
        .then(res => {
          console.log(res)
          res.data.data.forEach(item => {
            this.fileList.push({
              id: item.carousel_id,
              name: item.describes,
              url: 'http://localhost:3000/'+item.imgPath,
              status: "success"
            })
          })
        })
    }
  }
}
</script>

<style scoped>
.addOrEditTitle {
  font-size: 18px;
  text-align: center;
  width: 100%;
  font-weight: bold;
  color: #333;
  padding-bottom: 20px;
}
</style>