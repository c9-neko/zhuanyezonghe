<template>
  <div>
    <div class="title">
      商品管理:
    </div>
    <div style="display:flex;justify-content:flex-end;">
      <div style="width: 300px;margin-right: 20px;">
        <el-input placeholder="请输入内容搜索" v-model="searchKey">
          <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
        </el-input>
      </div>
      <el-button @click="addShop" type="primary" size="middle">新增商品</el-button>
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
        prop="product_name"
        label="商品名称"
        width="80">
      </el-table-column>
      <el-table-column
        prop="category_name"
        label="类型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="product_title"
        label="商品标题">
      </el-table-column>
      <el-table-column
        label="商品描述">
        <template slot-scope="scope">
          <div style="cursor:pointer" @click="showDetail(scope.row.product_intro)">  
            {{scope.row.product_intro.slice(0,30) + '...'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img style="width: 50px;object-fit:contain;" :src="'http://localhost:3000/'+scope.row.product_picture" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        prop="product_price"
        label="商品原价">
      </el-table-column>
      <el-table-column
        prop="product_selling_price"
        label="商品售价">
      </el-table-column>
      <el-table-column
        prop="product_num"
        label="库存">
      </el-table-column>
      <el-table-column
        prop="product_sales"
        label="销售数量">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="readDetail(scope)"
            type="text"
            size="middle">
            查看
          </el-button>
         
          <el-button
            @click.native.prevent="editor(scope)"
            type="text"
            size="middle">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="uploadImg(scope)"
            type="text"
            size="middle">
            上传产品图片
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
        :page-size="15"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="上传图片"
      :close-on-click-modal="false"
      :visible.sync="uploadDialogStatus"
      width="50%">
        <div>
          <el-upload
            class="upload-demo"
            action=""
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadDialogStatus = false">确 定</el-button>
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
      register: false,
      userInfo: {},
      uploadDialogStatus: false,
      fileList: [],
      row: {},
      searchKey: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 上传图片
    beforeUpload(file) {
      let params = new FormData()
      params.append('file', file)
      params.append('id', this.row.row.product_id)
      this.$axios.post('/api/product/upload', params,{headers: {'Content-Type': 'multipart/form-data'}})
        .then(res => {
          console.log(res)
          if (res.data.code == '001') {
            this.fileList.push({
              id: res.data.data.id,
              intro: res.data.data.intro,
              product_id: res.data.data.product_id,
              name: res.data.data.product_picture.split('/')[res.data.data.product_picture.split('/').length - 1],
              url: 'http://localhost:3000/'+res.data.data.product_picture,
              status: "success"
            })
            this.notifySucceed(res.data.msg)
          } else {
            this.notifyError(res.data.msg)
          }
        })
    },
    // 删除图片
    handleRemove(...val) {
      this.$axios.post('/api/product/deleteProductImg', {
        id: val[0].id
      })
        .then(res => {
          if (res.data.code == '001') {
            this.fileList = val[1]
            this.notifySucceed(res.data.msg)
          } else {
            // this.uploadImg(this.row)
            this.notifyError(res.data.msg)
          }
        })
    },
    // 预览图片
    handlePreview(file) {
      window.open(file.url)
    },
    // 上传图片的弹出的开关
    uploadImg(row) {
      this.row = row
      this.$axios.post('/api/product/getProductImgs', {
        product_id: row.row.product_id
      })
        .then(res => {
          if (res.data.code == '001') {
            this.fileList = []
            res.data.data.forEach(item => {
              this.fileList.push({
                id: item.id,
                intro: item.intro,
                product_id: item.product_id,
                name: item.product_picture.split('/')[item.product_picture.split('/').length - 1],
                url: 'http://localhost:3000/'+item.product_picture,
                status: "success"
              })
            })
            this.uploadDialogStatus = true
          } else {
            this.notifyError(res.data.msg)
          }
        })
    },
    // 查看商品介绍详情
    showDetail(val) {
      this.$alert(val, '商品描述', {confirmButtonText: '确定'});
    },
    getList() {
      this.$axios.post('/api/product/getAdminList', {
        cp: this.cp,
        searchKey: this.searchKey
      })
        .then(res => {
          this.tableData = res.data.data.data
          this.total = res.data.data.total
        })
    },
    changeCP(index) {
      this.cp = index
      this.getList()
    },
    // 删除商品
    // _delete(row) {
    //   this.$confirm('该操作除了删除该商品同时还会删除其所有图片，确认删除吗?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       this.$axios.post('/api/product/delete', {
    //         id: row.row.product_id
    //       })
    //         .then(res => {
    //           if (res.data.code == '001') {
    //             this.notifySucceed(res.data.msg)
    //             this.getList()
    //           } else {
    //             this.notifyError(res.data.msg)
    //           }
    //         })
    //     }).catch(() => {});
    // },
    _delete(row) {
      const productId = row.row ? row.row.product_id : row.product_id;  // 修改 row 的获取方式
      if (!productId) {
        this.notifyError('商品ID无效');
        return;
      }

      this.$confirm('该操作除了删除该商品同时还会删除其所有图片，确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        // 发送删除请求
        this.$axios.post('/api/product/delete', {
          id: productId
        })
        .then(res => {
          if (res.data.code === '001') {
            this.notifySucceed(res.data.msg);
            this.getList();  // 删除成功后，刷新商品列表
          } else {
            this.notifyError(res.data.msg || '删除失败，请稍后再试');
          }
        })
        .catch(err => {
          this.notifyError('删除请求失败，请检查网络或稍后再试');
          console.error('删除商品请求失败:', err);
        });
      })
      .catch(() => {
        // 取消删除操作
        this.notifyError('删除操作已取消');
      });
    },
 
    addShop() {
      this.$router.push({
        path: '/addOrEdit',
        query: {
          type: 'add'
        }
      })
    },
    editor(row) {
      this.$router.push({
        path: '/addOrEdit',
        query: {
          type: 'edit',
          id: row.row.product_id
        }
      })
    },
    readDetail(row) {
      this.$router.push({
        path: '/addOrEdit',
        query: {
          type: 'detail',
          id: row.row.product_id
        }
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