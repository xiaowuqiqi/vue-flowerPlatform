<template>
  <div>
    <nav-header ref="navHeader">
      <h2 slot="h2">
        详细页面
      </h2>
    </nav-header>
    <breadcrumb :breadcrumbData="[{
           name: '主页',
           path: '/'
         },{
           name: '鲜花小店',
           path: '/shopping'
         },{
           name: '详情页面',
           path: '/detail'
         }
         ]"></breadcrumb>
    <!-- single -->
    <div class="single">
      <div class="container">

        <!--内容-->

        <div class="col-md-8 single-box-left">

          <div class="single-box-left-head row col-md-12">
            <h3 class="col-md-8" id="siflname">{{detailObj.base.goodsName}}</h3>
          </div>
          <!--展示图片-->
          <div class="single-dowebok">
            <a :href="item" v-for="item in detailObj.detailed.ItemImgUrls">
              <img :src="item" class="thumbnail" alt=""/>
            </a>

          </div>
        </div>
        <div class="col-md-4 single-box-right">

          <div class="box-right-top">

            <h3 id="siflmoney">
              {{detailObj.base.price|currency('￥')}}
            </h3>
            <p class="op" id="sioriginalmoney">原价：{{detailObj.base.originalprice|currency('￥')}}</p>
            <ul class="box-int">
              <li id="simaterial">[材 料]:{{detailObj.base.material}}</li>
              <li id="sipackaging">[包 装]:{{detailObj.base.packaging}}</li>

            </ul>
            <div class="purchase">
              <a id="toaddress" class="btn btn-danger btn-lg" @click="toConfirm">立即购买</a>
              <br/>

              <a id="toshopping" class="btn btn-success btn-lg toshop" @click="toAddCart()">
                <span class="fa fa-plus-square"></span>加入购物车
              </a>
              <a class="btn btn-success collection btn-lg tocollec" data-tocollec="">
                <span class="fa fa-star-o "></span>收藏
              </a>
            </div>
          </div>
          <div class="box-right-mid">
            <div class="fx">
              <p>分享：</p>
              <a href="#" class="fx-qq">
                <div></div>
              </a>
              <a href="#" class="fx-wx">
                <div></div>
              </a>
              <a href="#" class="fx-wb">
                <div></div>
              </a>
            </div>
          </div>
          <div class="box-right-low">
            <h5>标签：</h5>
            <ul class="box-label" id="sifllabel">
              <a :href="'/#/shopping?goodsType='+item.TypeId" v-for="item in detailObj.base.goodsType">
                <li class="btn">{{item.TypeTitle}}</li>
              </a>
            </ul>
            <div class="box-ch">
              <h5>特性：</h5>
              <ul class="box-chtic" id="sicharacteristic">
                <li class="btn" v-if="detailObj.base.recommend"><span class="fa fa-tag"></span>推荐</li>
                <li class="btn" v-if="detailObj.base.quality"><span class="fa fa-trophy"></span>精品</li>
              </ul>
            </div>
            <hr/>
            <h5>数据：</h5>
            <div class="box-dat" id="flheat">
              <p>点击访问热度</p>
              <div class="progress">
                <div id="siclickheat" class="progress-bar progress-bar-primary"
                     :style="'width:'+detailObj.detailed.record.clickheat+'%'"></div>
              </div>
              <p>好评热度</p>
              <div class="progress">
                <div id="sipraiseheat" class="progress-bar progress-bar-success"
                     :style="'width:'+detailObj.detailed.record.praiseheat+'%'"></div>
              </div>
              <p>收藏热度</p>
              <div class="progress">
                <div id="sicollectionheat" class="progress-bar progress-bar-warning"
                     :style="'width:'+detailObj.detailed.record.collectionheat+'%'"></div>
              </div>
              <p>购买热度</p>
              <div class="progress">
                <div id="sipurchaseheat" class="progress-bar progress-bar-danger"
                     :style="'width:'+detailObj.detailed.record.purchaseheat+'%'"></div>
              </div>
            </div>

            <hr/>
            <h5>详情：</h5>
            <p class="details-name">推荐理由<span class="fa fa-chevron-left" aria-hidden="true"></span></p>
            <p class="details-data">{{detailObj.detailed.detail.reason}}</p>
            <p class="details-name">规格参数<span class="fa fa-chevron-left" aria-hidden="true"></span></p>
            <p class="details-data">{{detailObj.detailed.detail.specifications}}</p>
            <p class="details-name">品牌故事<span class="fa fa-chevron-left" aria-hidden="true"></span></p>
            <p class="details-data">{{detailObj.detailed.detail.brandstory}}</p>
            <p class="details-name">保养须知</p>
            <p class="details-data">{{detailObj.detailed.detail.maintenance}}</p>
            <p class="details-name">运输说明</p>
            <p class="details-data">{{detailObj.detailed.detail.transport}}</p>
            <p class="details-name">特别提醒</p>
            <p class="details-data">{{detailObj.detailed.detail.remind}}</p>
            <p class="details-name">退换货说明</p>
            <p class="details-data">{{detailObj.detailed.detail.returnorexchange}}</p>

            <hr/>
            <a class="" href="#"><span class="fa fa-plus-square"></span>联系客服人员</a>
          </div>

        </div>

        <!--内容结束-->

        <!-- //comments -->

        <!-- //leave-comments -->
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from '../components/NavHeader'
  import NavFooter from '../components/NavFooter'
  import '../assets/css/detail.css'

  export default {
    data() {
      return {
        detailObj: {}
      }
    },
    components: {
      NavFooter,
      NavHeader,
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let goodsId = this.$route.query.goodsId
        this.$http.get("/serverShopping/goodsId", {
          params: {//get的请求参数
            _id: goodsId
          }
        }).then((response) => {
          let res = response.data
          if (res.status === "0") {
            this.detailObj = res.result

          }
          else {
            console.dir(res)
          }
        })
      },
      toAddCart() {
        let goodsId = this.$route.query.goodsId
        this.$http.get("/serverUsers/addCart", {
          params: {//get的请求参数
            goodsId: goodsId
          }
        }).then((response) => {
          let res = response.data
          if (res.status === "0") {
            this.$store.commit('addBadge')
          }
          else {
            console.dir(res)
          }
        })
      },
      toConfirm() {
        let goodsId = this.$route.query.goodsId
        this.$http.post("/serverUsers/editTemporary", {
          orderGoods: goodsId,
          checkedOne: '1'
        }).then((response) => {
          let res = response.data
          if (res.status === "0") {
            this.$router.push({//注意有'r'
              path: '/address'
            })
          }
          else {
            console.dir(res)
          }
        })
      },

    }
  }
</script>

