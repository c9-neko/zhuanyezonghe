/*
 * 入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局函数及变量
import Global from './Global';
Vue.use(Global);

import Axios from 'axios';
Axios.defaults.withCredentials=true;
Vue.prototype.$axios = Axios;
// 全局请求拦截器
Axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 跳转error页面
    // router.push({ path: "/error" });
    return Promise.reject(error);
  }
);
// 全局响应拦截器
Axios.interceptors.response.use(
  res => {
    if (res.data.code === "401") {
      // 401表示没有登录
      // 提示没有登录
      Vue.prototype.notifyError(res.data.msg);
      // 修改vuex的showLogin状态,显示登录组件
      // store.dispatch("setShowLogin", true);
    }
    // if (res.data.code === "500") {
    //   // 500表示服务器异常
    //   // 跳转error页面
    //   router.push({ path: "/error" });
    // }
    return res;
  },
  error => {
    // 跳转error页面
    // router.push({ path: "/error" });
    return Promise.reject(error);
  }
);

// 全局拦截器,在进入需要用户权限的页面前校验是否已经登录
router.beforeResolve((to, from, next) => {
  if (to.name =='login') {
    next()
  }
  if (localStorage.getItem('adminUserInfo')) {
    next();
  } else {
    alert('您还没有登录，请先登录');
    next('/login');
  }
});

// 相对时间过滤器,把时间戳转换成时间
// 格式: 2020-02-25 21:43:23
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str;
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});

//全局组件
import MyMenu from './components/MyMenu';
Vue.component(MyMenu.name, MyMenu);
import MyList from './components/MyList';
Vue.component(MyList.name, MyList);
import MyLogin from './components/MyLogin';
Vue.component(MyLogin.name, MyLogin);


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
