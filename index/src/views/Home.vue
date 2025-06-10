<!--
 * @Description: 首页组件
 -->
<template>
  <div class="home" id="home" name="home">
    <!-- 轮播图 -->
    <div class="block">
      <el-carousel height="460px">
        <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
          <img style="height:460px;" :src="$target + item.imgPath" :alt="item.describes" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图END -->
    <div class="main-box">
      <div class="main">
        <!-- 零食商品展示区域 -->
        <div class="snack">
          <div class="box-hd">
            <div class="title">休闲食品</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
             <ul>
                <li>
                  <img :src="$target +'public/imgs/snack/snacks.jpg'" />
                </li>
                <li>
                  <img :src="$target +'public/imgs/snack/snack.jpg'" />
                </li>
              </ul>
            </div>
            <div class="list">
              <MyList :list="snackList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- 零食商品展示区域END -->

        <!-- 彩妆商品展示区域 -->
        <div class="makeup" id="promo-menu">
          <div class="box-hd">
            <div class="title">彩妆</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul>
                <li>
                  <img :src="$target +'public/imgs/makeup/kouhong.jpg'" />
                </li>
                <li>
                  <img :src="$target +'public/imgs/makeup/eye.jpg'" />
                </li>
              </ul>
            </div>
            <div class="list">
              <MyList :list="makeupList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- 彩妆商品展示区域END -->

        <!-- 衣服商品展示区域 -->
        <div class="appare" id="promo-menu">
          <div class="box-hd">
            <div class="title">服饰</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul>
                <li>
                  <img :src="$target +'public/imgs/appare/cloth.jpg'" alt />
                </li>
                <li>
                  <img :src="$target +'public/imgs/appare/clothes.jpg'" alt />
                </li>
              </ul>
            </div>
            <div class="list">
              <MyList :list="apparelList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- 服饰商品展示区域END -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carousel: "", // 轮播图数据
      snackList: "", // 休闲零食列表
      makeupList: "", // 美妆列表
      apparelList: "", //服饰列表
    };
  },
  created() {
    // 获取轮播图数据
    this.$axios
      .post("/api/resources/carousel", {})
      .then(res => {
        this.carousel = res.data.carousel;
      })
      .catch(err => {
        return Promise.reject(err);
      });
    // 获取各类商品数据
    this.getPromo("零食", "snackList");
    this.getPromo("美妆","makeupList");
    this.getPromo("服装","apparelList");
  },
  methods: {
    // 获取各类商品数据方法封装
    getPromo(categoryName, val, api) {
      api = api != undefined ? api : "/api/product/getPromoProduct";
      this.$axios
        .post(api, {
          categoryName
        })
        .then(res => {
          this[val] = res.data.Product;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }
  }
};
</script>
<style scoped>
@import "../assets/css/index.css";
</style>