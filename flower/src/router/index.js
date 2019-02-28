import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Shopping from '@/views/shopping'
import Florist from '@/views/florist'
import Blog from '@/views/blog'
import Detail from '@/views/detail'
import User from '@/views/User'
//订单
import Cart from '@/views/cart.vue'
import Address from '@/views/address.vue'
import OrderConfirm from '@/views/orderConfirm.vue'
import OrderSuccess from '@/views/orderSuccess.vue'

import RegisteredModal from '@/components/RegisteredModal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/text',
      name: 'RegisteredModal',
      component: RegisteredModal
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/shopping',
      name: 'Shopping',
      component: Shopping
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/florist',
      name: 'Florist',
      component: Florist
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {//订单开始
      path: '/cart',
      component: Cart
    },
    {
      path: '/address',
      component: Address
    },
    {
      path:'/orderConfirm',
      name: 'OrderConfirm',
      component:OrderConfirm
    },
    {
      path:'/orderSuccess',
      name: 'OrderSuccess',
      component:OrderSuccess
    }//订单结束
  ]
})
