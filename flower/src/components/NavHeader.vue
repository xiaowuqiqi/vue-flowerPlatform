<template>
  <!-- banner -->
  <div class="banner about-banner">

    <div class="header transitionf10 about-header" :class="{'header-scroll':scrollTop>20}">
      <div class="container">
        <div class="header-left transitionf10">
          <div class="wzlayouts-logo">
            <h1>
              <a href="index.html" class="f10">Qfy <span class="f333">清芳源</span></a>
            </h1>
          </div>
        </div>
        <div class="header-right transitionf10">
          <div class="top-nav">
            <nav class="navbar navbar-default">
              <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              </div>
              <!-- Collect the nav links, forms, and other content for toggling -->
              <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                  <li><a class="active" href="/#/">主页</a></li>
                  <li><a href="/#/florist">花艺师</a></li>
                  <li><a href="/#/shopping">鲜花小店</a></li>
                  <li><a href="/#/blog">鲜花知识</a></li>
                  <li><a href="/#/contact">关于</a></li>
                </ul>
                <div class="clearfix"></div>
              </div>
            </nav>
          </div>
          <!--右上角-->

          <div class="user-log-off"  v-show="$store.state.loginType != '2'">
            <ul>
              <li>
                <a @click="loginCheck=true" href="#">
                  <i>登录</i>
                  <span>[尚未登录]</span>
                </a>
              </li>
              <li>
                <a @click="regisCheck=true" href="#">
                  <i>注册</i>
                  <span>[立即注册]</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="user-log-on"  v-show="$store.state.loginType == '2'">
            <ul>
              <li>
                <a href="/#/cart" @click="$store.commit('removeBadge')">
                  <i class="fa fa-shopping-cart transitionf10"></i>
                  <em class="badge bgcf10red">{{$store.state.badge}}</em>
                  <span>[购物车]</span>
                </a>
              </li>
              <li>
                <a href="/#/user"><i class="fa fa-male transitionf10"></i>
                  <span>[个人信息]</span>
                  <!--<span>[小明同学]</span>-->
                </a>
              </li>
            </ul>
          </div>

          <div class="clearfix"></div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <div class="header-bg"></div>
    <!--副标题插槽-->
    <div class="about-heading" id="orderFullScreen">
      <div class="container">
        <wow-plus>
        <!--<h2>第三方</h2>-->
        <slot name="h2"></slot>
        </wow-plus>
      </div>
    </div>
    <!--提示框-->
    <alert ref="alertMod"></alert>
    <!--登录模态框-->
    <login-modal :mdShow="loginCheck"
                 @loginok="loginOk(tel)"
                 @closemodal="loginCheck=false"></login-modal>
    <registered-modal :mdShow="regisCheck"
                      @loginok="loginOk(tel)"
                      @closemodal="regisCheck=false"></registered-modal>
  </div>
  <!-- //banner -->
</template>

<script>
  import LoginModal from '../components/LoginModal'
  import RegisteredModal from '../components/RegisteredModal'
  import '../assets/css/navHeader.css'

  export default {
    components: {RegisteredModal, LoginModal},
    data() {
      return {
        scrollTop: 0,
        loginCheck:false,
        regisCheck:false
      }

    },
    mounted() {
      window.addEventListener('scroll', this.getScroll)
    },
    comments:{
      LoginModal,
      RegisteredModal
    },
    methods: {
      getScroll() {//滚动距离
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      },
      getAlert(type,str) {
        this.$refs.alertMod.start(type,str);
      },
      loginOk(tel){
        this.loginCheck=false
        this.regisCheck=false
        this.$store.commit('loginOk')
        this.getAlert(2,'登录成功')
      }
    },
  }

</script>
