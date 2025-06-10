import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/home'
import login from '../views/login'

import userManage from '../views/userManage'
import msgManage from '../views/msgManage'
import orderManage from '../views/orderManage'
import shopManage from '../views/shopManage'
import statistics from '../views/statistics'
import addOrEdit from '../views/addOrEdit'
import carousel from '../views/carousel'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/userManage',
      children: [
        {
          path: 'userManage',
          name: 'userManage',
          component: userManage
        },
        {
          path: 'msgManage',
          name: 'msgManage',
          component: msgManage
        },
        {
          path: 'orderManage',
          name: 'orderManage',
          component: orderManage
        },
        {
          path: 'shopManage',
          name: 'shopManage',
          component: shopManage
        },
        {
          path: 'statistics',
          name: 'statistics',
          component: statistics
        },
        {
          path: 'addOrEdit',
          name: 'addOrEdit',
          component: addOrEdit
        },
        {
          path: 'carousel',
          name: 'carousel',
          component: carousel
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
