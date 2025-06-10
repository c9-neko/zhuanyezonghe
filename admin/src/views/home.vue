<template>
  <el-container>
    <el-header>
      <div class="title">
        后台管理系统
      </div>
    </el-header>
    <el-container>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            @select="handleSelect">
            <el-menu-item index="1">
              <i class="el-icon-location"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">留言管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-goods"></i>
              <span slot="title">商城统计</span>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-goods"></i>
              <span slot="title">轮播图管理</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-switch-button"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  created() {
    this.setSelectIndex()
  },
  methods: {
    setSelectIndex() {
      switch(this.$route.name) {
        case 'userManage':
          this.activeIndex = '1'
          break
        case 'msgManage':
          this.activeIndex = '2'
          break
        case 'orderManage':
          this.activeIndex = '4'
          break
        case 'shopManage':
          this.activeIndex = '3'
          break
        case 'statistics':
          this.activeIndex = '5'
          break
        case 'carousel':
          this.activeIndex = '6'
          break
        case 'addOrEdit':
          this.activeIndex = '3'
          break
      }
    },
    handleSelect(index) {
      switch(index) {
        case '1':
          this.$router.push('/userManage')
          break
        case '2':
          this.$router.push('/orderManage')
          break
        case '3':
          this.$router.push('/shopManage')
          break
        case '4':
          this.$router.push('/msgManage')
          break
        case '5':
          this.$router.push('/statistics')
          break
        case '6':
          this.$router.push('/carousel')
          break
        case '7':
          this.$router.replace('/login')
          localStorage.removeItem('adminUserInfo')
          break
      }
    }
  }
}
</script>

<style scoped>
  .title {
    text-align: left;
    font-size: 30px;
    font-weight: bold;
    height: 60px;
    padding-left: 20px;
    width: 100%;
    color: #fff;
  }
  .el-container{
    height: 92vh;
  }
  .el-header, .el-footer {
    background-color: #333;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
    
  }
  .el-menu {
    height: 100%;
  }
  
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>