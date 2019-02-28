// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min'

/**
 * 第三方组件加载
 * */
import VueResource from 'vue-resource'//基于vue异步请求提交插件
Vue.use(VueResource)//利用中间件方式，加载VueResource
import VueLazyLoad from 'vue-lazyload'//图片懒加载软件
Vue.use(VueLazyLoad, {//加载vueLazyLoad
  loading: "/static/loading-svg/loading-bars.svg"
})
import vueInfiniteScroll from 'vue-infinite-scroll'//滚动监听与加载
Vue.use(vueInfiniteScroll)
import Vuex from 'vuex'//vuex
Vue.use(Vuex)
import VueWow from 'vue-wow'//wow
Vue.use(VueWow)

/**
 * 工具加载
 * */
import {currency} from './util/currency'
Vue.filter('currency', currency)//添加金钱过滤器
import LRCheck from './util/loginRegisterCheck'
Vue.use(LRCheck)

/**
 * 加载js
 * */
// import './assets/lib/js/responsiveslides.min.js'
// import './assets/lib/js/SmoothScroll.min.js'
//toTop
import './assets/lib/js/move-top.js'
import './assets/lib/easing/easing.js'
//标题滚屏
import './assets/lib/js/responsiveslides.min.js'
import './assets/js/toTop.js'

/**
 * 组件加载
 * */
import Breadcrumb from './components/breadcrumb'
Vue.use(Breadcrumb);
import Alert from './components/alert'
Vue.use(Alert);
import Modal from './components/modal'
Vue.use(Modal);
import WowPlus from './components/wow'
Vue.use(WowPlus);

/* eslint-disable no-ne */
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    badge: '',
    loginType: '0'
  },
  mutations: {
    addBadge(state) {
      if (state.badge === '')
        state.badge = 1
      else
        state.badge++
    },
    removeBadge(state) {
      state.badge = ''
    },
    loginOk(state) {
      state.loginType = '2'
    },
    cancellation(state){
      state.loginType = '0'
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  mounted() {
    this.init()
  },
  methods:{
    init(){//判断是否登录
      this.$http.post("/serverUsers/checkLogin").then((response) => {
        let res = response.data
        if (res.status === "0") {
          //登录
          this.$store.commit('loginOk')
        }
      })
    },
  }
})
