<template>
  <div>
    <nav-header>
      <h2 slot="h2">恭喜完成</h2>
    </nav-header>
    <breadcrumb :breadcrumbData="[{
           name: '主页',
           path: '/'
         },{
           name: '个人信息',
           path: '/user'
         },{
           name: '购物车',
           path: '/cart'
         },{
           name: '完成订单',
           path: '/orderConfirm'
         }
         ]"></breadcrumb>
    <div class="container">
      <!--<div class="page-title-normal">-->
        <!--<h2 class="page-title-h2"><span>check out</span></h2>-->
      <!--</div>-->
      <!-- 进度条 -->
      <div class="check-step">
        <wow-plus>
        <ul>
          <li class="cur"><span>选择</span> 地址</li>
          <li class="cur"><span>确认</span> 订单</li>
          <li class="cur"><span>立即</span> 支付</li>
          <li class="cur"><span>完成</span> 订单</li>
        </ul>
        </wow-plus>
      </div>
      <wow-plus>
      <div class="order-create">
        <div class="order-create-pic"><img src="../assets/img/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>祝贺你！<br>您的订单正在处理中！</h3>
          <p>
            <span>订单ID：100000001</span>
            <span>订单总数：1000</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <a href="javascript:;" class="wzBtn2">购物车</a>
            </div>
            <div class="btn-r-wrap">
              <a href="javascript:;" class="wzBtnRed2">鲜花小店</a>
            </div>
          </div>
        </div>
      </div>
      </wow-plus>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
    export default {
      components:{
        NavHeader,
        NavFooter,
      },
    }
</script>
