<template>
  <div class="personal" id="personal">
    <nav-header>
      <h2 slot="h2">个人主页</h2>
    </nav-header>
    <breadcrumb :breadcrumbData="[{
           name: '主页',
           path: '/'
         },{
           name: '个人信息',
           path: '/user'
         }
         ]"></breadcrumb>
    <div class="container">
      <wow-plus>
        <div class="user-new ">
          <div class="user-new-con transitionf10">
            <div class="user-portrait">
              <div class="user-img">
              </div>
            </div>
            <div class="user-name">
              <p class="f605">手 机 号</p>
              <div class="hr bgcf10"></div>
              <input class="f605" type="text" value="150****056" disabled>
            </div>
            <div class="user-pass">
              <a href="javascript:;" class="wzBtn2">修改手机</a>
              <a href="javascript:;" class="wzBtn2">修改密码</a>
              <a href="javascript:;" class="wzBtnRed2" @click="onCancellation">注销登录</a>
            </div>
          </div>

        </div>
      </wow-plus>
      <wow-plus>
        <div class="user-collection" v-if="usersObj.collectionGoods.length != 0">
          <div class="personal-inp-top">
            <h3>鲜花收藏</h3>
            <p class="personal-remarks">*点击鲜花可以查看详情</p>
          </div>
          <div class="personal-hr"></div>
          <div class="user-co llection-goods clearfix">
            <template v-for="item in usersObj.collectionGoods">
              <single-goods
                :goods="item.goods"
              >
              </single-goods>
            </template>
          </div>
        </div>
      </wow-plus>
      <wow-plus>
        <div class="user-address">
          <div class="personal-inp-top">
            <h3>我的地址</h3>
            <p class="personal-remarks">*点击加号可以添加新的地址</p>
          </div>
          <div class="personal-hr"></div>
          <div class="user-address-com">
            <address-com></address-com>
          </div>

        </div>
      </wow-plus>

      <div class="user-order">
        <wow-plus>
          <div class="personal-inp-top">
            <h3>快递信息</h3>
            <p class="personal-remarks">*此处为添加其他注释信息</p>
          </div>
        </wow-plus>
        <div class="personal-hr"></div>
        <wow-plus>
          <ul class="order-state">
            <li><a href="javascript:;" class="wzBtn" @click="orderType='1';userOrderChecked='-1'"
                   :class="{wzBtnActive:orderType==='1'}">已支付</a></li>
            <li><a href="javascript:;" class="wzBtn" @click="orderType='2';userOrderChecked='-1'"
                   :class="{wzBtnActive:orderType==='2'}">配送中</a></li>
            <li><a href="javascript:;" class="wzBtn" @click="orderType='3';userOrderChecked='-1'"
                   :class="{wzBtnActive:orderType==='3'}">已送达</a></li>
          </ul>
        </wow-plus>
        <div class="order-date">
            <table>
              <thead>
              <th>收花人</th>
              <th>订单号</th>
              <th>产品数量</th>
              <th>订单日期</th>
              <th>发货日期</th>
              <th>小计</th>
              <th>操作</th>
              </thead>
              <tbody class="userOrder-table-tbody">
              <template v-for="(userOrder,index) in usersObj.userOrder">
                <tr class="userOrder-order" v-if="userOrder.orderType == orderType">
                  <td>
                    <wow-plus>
                      <h4>{{userOrder.order.recAddress.consignee}}</h4>
                    </wow-plus>
                  </td>
                  <td><wow-plus>{{userOrder.orderNumber}}</wow-plus></td>
                  <td><wow-plus><input class="goods-num" type="text" :value="getOrderNum(userOrder)" disabled></wow-plus></td>
                  <td><wow-plus>
                    {{getOrderDate(userOrder.order.orderDate)[0]}}<em>{{getOrderDate(userOrder.order.orderDate)[1]}}</em>
                  </wow-plus></td>
                  <td><wow-plus>
                    {{getOrderDate(userOrder.order.sendDate)[0]}}<em>{{getOrderDate(userOrder.order.sendDate)[1]}}</em>
                  </wow-plus></td>
                  <td><wow-plus><span class="f10red">{{userOrder.order.orderTotal|currency('￥',2)}}</span></wow-plus></td>
                  <td><wow-plus>
                    <a href="javascript:;" class="wzBtn2" @click="setUserOrderChecked(index)">查看</a>
                    <a href="javascript:;" class="wzBtnRed2">催单</a>
                  </wow-plus></td>
                </tr>
                <tr v-if="userOrderChecked == index">
                  <td colspan="7">
                      <order-goods-item :orderData="userOrder.order"></order-goods-item>
                  </td>
                </tr>
              </template>
              </tbody>
            </table>
        </div>
      </div>

    </div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import '../assets/css/user/user.css'
  import NavHeader from '../components/NavHeader'
  import NavFooter from '../components/NavFooter'
  import OrderGoodsItem from '../components/order/OrderGoodsItem'
  import AddressCom from '../components/order/AddressCom'
  import SingleGoods from '../components/SingleGoods'

  export default {
    data() {
      return {
        usersObj: {},
        userOrderChecked: -1,
        orderType: '1'
      }
    },
    components: {
      NavFooter,
      NavHeader,
      SingleGoods,
      OrderGoodsItem,
      AddressCom
    },
    mounted() {
      this.init()
    },
    computed: {},
    methods: {
      init() {
        this.$http.get("/serverUsers").then((response) => {
          let res = response.data
          if (res.status == '0')
            this.usersObj = res.result
          else if (res.status == '-1') {
            this.usersObj = null
          }
        })
      },
      onCancellation() {
        this.$http.post("/serverUsers/logout").then((response) => {
          let res = response.data
          if (res.status == '0') {
            this.$store.commit("cancellation")
            this.$router.push({//注意有'r'
              path: '/'
            })
          }
        })
      },
      setUserOrderChecked(index) {
        if (this.userOrderChecked == index)
          this.userOrderChecked = -1
        else
          this.userOrderChecked = index
      },
      getOrderNum(userOrder) {
        let _num = 0
        userOrder.order.orderGoods.forEach(function (item) {
          _num += item.goodsNum
        })
        return _num
      },
      getOrderDate(OrderDateStr) {
        let OrderDate = OrderDateStr.split("|")
        return OrderDate
      },
    }
  }
</script>

<style scoped>

</style>
