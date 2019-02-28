<template>
  <div>
    <nav-header>
      <h2 slot="h2">选择地址</h2>
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
           name: '选择地址',
           path: '/address'
         }
         ]"></breadcrumb>
    <div class="checkout-page">

      <div class="container">
        <div class="checkout-addr">
          <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
          </div>
          <!-- process step -->
          <div class="check-step">
            <wow-plus :delay="0.2">
              <ul>
                <li class="cur"><span>选择</span> 地址</li>
                <li><span>确认</span> 订单</li>
                <li><span>立即</span> 支付</li>
                <li><span>完成</span> 订单</li>
              </ul>
            </wow-plus>
          </div>

          <!-- address list -->
          <wow-plus>
            <div class="page-title-normal checkout-title">
              <h2><span>送达收花人的地址</span></h2>
            </div>
            <address-com @getaddressid="getSelAddId"></address-com>
          </wow-plus>
          <!--送花人-->
          <wow-plus>
            <div class="page-title-normal checkout-title">
              <h2><span>送花人信息(手机号/姓名)</span></h2>
            </div>
            <div class="page-sender">
              <ul>
                <li class="page-sender-tel">
                  <input type="tel" placeholder="送花人手机号"/>
                  <a href="javascript:;" class="wzBtn" @click="clickSetTel('default')">使用注册手机号</a>
                  <a href="javascript:;" class="wzBtn" @click="clickSetTel('anonymous')">匿名</a></li>
                <li class="page-sender-name">
                  <input class="" type="text" placeholder="送花人姓名"/>
                  <a href="javascript:;" class="wzBtn" @click="clickSetName()">匿名</a></li>
              </ul>
            </div>
          </wow-plus>
          <!-- 留言-->
          <wow-plus>
            <div class="page-title-normal checkout-title">
              <h2><span>贺卡与留言</span></h2>
            </div>
            <div class="leaving-message">
              <div>
              <textarea rows="5" placeholder="为收花人编写你的祝福贺卡吧……" class="remark">
            </textarea>
              </div>
            </div>
            <div class="next-btn-wrap">
              <a class="wzBtnRed2" href="javascript:;" @click="toOrderConfirm">下一步
              </a>
            </div>
          </wow-plus>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
    <!--模态框-->
    <modal :mdShow="mdShow" @closemodal="mdShow=false">
      <h2 slot="h2">{{mdH2Str}}</h2>
      <p slot="p" class="">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{mdPStr}}</p>
      <div slot="btn">
        <a class="wzBtn2" @click="mdShow=false">关闭</a>
      </div>
    </modal>
  </div>
</template>

<script>
  import NavHeader from '../components/NavHeader'
  import NavFooter from '../components/NavFooter'
  import AddressCom from '../components/order/AddressCom'

  export default {
    data() {
      return {
        mdShow: false,
        mdH2Str: '',
        mdPStr: '',
        limit: 3,//截取显示3条地址
        selectedAddrId: ''//选中id
      }
    },
    components: {
      NavHeader,
      NavFooter,
      AddressCom,
    },
    mounted() {
      this.init()
    },
    computed: {
      addressListFilter() {
        return this.addressList.slice(0, this.limit)
      }
    },
    methods: {
      init() {

      },
      //好用的展开功能
      expand() {
        if (this.limit == 3) {
          this.limit = this.addressList.length
        } else {
          this.limit = 3;
        }
      },
      //设置默认地址
      setDefault(addressId) {
        this.$http.post("/users/setDefault", {
          addressId: addressId
        }).then((response) => {
          let res = response.data
          if (res.status == '0') {
            this.init()
          }
        })
      },
      //匿名与设置注册手机号
      clickSetName() {
        $('.page-sender-name').children('input').val('匿名')
      },
      clickSetTel(str) {
        let inputEle = $('.page-sender-tel').children('input')
        switch (str) {
          case 'anonymous':
            inputEle.val('0')
            break;
          case 'default':
            inputEle.val('1002215253')
            break;
        }

      },
      //获取选中地址id
      getSelAddId(value) {
        this.selectedAddrId = value
      },
      //跳转
      toOrderConfirm() {
        let selectedAddrId = this.selectedAddrId
        let tel = $('.page-sender-tel').children('input').val()
        let name = $('.page-sender-name').children('input').val()
        let remark = $('.remark').val()

        //校验
        if (!selectedAddrId) {
          this.mdH2Str = "请选择一条收花人地址信息"
          this.mdPStr = "点击“送达收花人的地址”下面的“+”可以增加新的信息"
          this.mdShow = true
          return
        }
        if (!tel) {
          this.mdH2Str = "请输入送花人电话"
          this.mdPStr = "如果匿名送出可以点击“匿名”"
          this.mdShow = true
          return
        }
        if (!name) {
          this.mdH2Str = "请选择送花人姓名"
          this.mdPStr = "如果匿名送出可以点击“匿名”"
          this.mdShow = true
          return
        }
        if (!remark) {
          this.mdH2Str = "请写入祝福语"
          this.mdPStr = "祝福语和备注老板会按着吩咐定制您的订单"
          this.mdShow = true
          return
        }
        console.log(selectedAddrId, tel, name, remark)
        //提交
        this.$http.post("/serverUsers/editTemporary", {
          consignee: name,
          tel: tel,
          remark: remark,
          recAddressId: selectedAddrId
        }).then((response) => {
          let res = response.data
          if (res.status === "0") {
            this.$router.push({//注意有'r'
              path: '/orderConfirm'
            })
          }
          else {
            console.dir(res)
          }
        })
      }
    }
  }
</script>

