<template>
  <!-- gallery -->
  <div class="shopping">
    <nav-header>
      <h2 slot="h2">鲜花小店</h2>
    </nav-header>
    <breadcrumb :breadcrumbData="[{
           name: '主页',
           path: '/'
         },{
           name: '鲜花小店',
           path: '/shopping'
         }
         ]"></breadcrumb>
    <div class="container ">
      <div class="retrieval-bor">
        <div class="retrieval-shelter" @click="retrievalChecked = false;toshopping()" v-show="retrievalChecked"></div>

        <div class="retrieval-frame borf10">
          <div class="borf10 retrieval clearfix">
            <div class="retrieval-left col-lg-7">
              <a href="jsvascript:;" class="wzBtn retrieval-add" @click="retrievalChecked = true"><span
                class="fa fa-plus"></span> 添加检索:</a>
              <ul class="clearfix">
                <li v-for="item in this.goodsChecks"><a href="jsvascript:;" class="wzBtn" :data-to-id="item.id"
                                                        @click="clickRemoveLabel($event);toshopping()">{{item.name}}</a><span>·</span>
                </li>
              </ul>
            </div>
            <div class="retrieval-right col-lg-5">
              <ul class="clearfix">
                <li><a href="jsvascript:;" class="wzBtn" :class="{wzBtnActive:params.priceLevel=='0'}"
                       @click="params.priceLevel='0';toshopping()">100以下</a></li>
                <li><a href="jsvascript:;" class="wzBtn" :class="{wzBtnActive:params.priceLevel=='1'}"
                       @click="params.priceLevel='1';toshopping()">100-400</a></li>
                <li><a href="jsvascript:;" class="wzBtn" :class="{wzBtnActive:params.priceLevel=='2'}"
                       @click="params.priceLevel='2';toshopping()">400以上</a></li>
                <li><a href="jsvascript:;" class="wzBtn" :class="{wzBtnActive:params.priceLevel=='all'}"
                       @click="params.priceLevel='all';toshopping()">All</a></li>
                <li>
                  <div class="sort"><a href="jsvascript:;" class="wzBtn sort"
                                       :class="{wzBtnActive:params.sort=='1'||params.sort=='-1'}"
                                       @click="clickSort();toshopping()">排序
                    <span
                      :class="{'fa-sort-amount-asc':params.sort=='1','fa-sort-amount-desc':params.sort=='-1'}"
                      class="fa"></span></a></div>
                </li>
              </ul>
              <!--fa-sort-amount-esc 降序class-->
            </div>
          </div>
          <div class="retrieval-condition clearfix" v-show="retrievalChecked">
            <div class="triangle"></div>
            <ul class="clearfix">
              <li class="left wzBtnActive wzBtn borf10">花材</li>
              <li v-for="item in labelObj.material">
                <a href="jsvascript:;" class="wzBtn borf10" :id="'flower-label-'+item.type"
                   @click="clickAddLabel($event)">{{item.name}}</a>
              </li>
            </ul>
            <ul class="clearfix">
              <li class="left wzBtnActive wzBtn borf10">节日</li>
              <li v-for="item in labelObj.festival">
                <a href="jsvascript:;" class="wzBtn borf10" :id="'flower-label-'+item.type"
                   @click="clickAddLabel($event)">{{item.name}}</a>
              </li>
            </ul>
            <ul class="clearfix">
              <li class="left wzBtnActive wzBtn borf10">鲜花用途</li>
              <li v-for="item in labelObj.use">
                <a href="jsvascript:;" class="wzBtn borf10" :id="'flower-label-'+item.type"
                   @click="clickAddLabel($event)">{{item.name}}</a>
              </li>
            </ul>
            <ul class="clearfix">
              <li class="left wzBtnActive wzBtn borf10">按对象选花</li>
              <li v-for="item in labelObj.seniority">
                <a href="jsvascript:;" class="wzBtn borf10" :id="'flower-label-'+item.type"
                   @click="clickAddLabel($event)">{{item.name}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="gallery">
      <div class="container">
        <div class="gallery-grids"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="params.busy"
             infinite-scroll-distance="2">
          <template v-for="item in shoppArr">
            <single-goods :goods="item"></single-goods>
          </template>
          <div class="clearfix"></div>
        </div>
        <img v-show="!params.busyEnd" class="loadingSvg" src="/static/loading-svg/loading-bubbles.svg" alt="">
      </div>
    </div>
    <nav-footer></nav-footer>
    //alert
    <alert ref="alertMod"></alert>
  </div>

  <!-- //gallery -->
</template>

<script>
  import NavHeader from '../components/NavHeader'

  import NavFooter from '../components/NavFooter'
  import singleGoods from '../components/SingleGoods'
  import '../assets/css/shopping.css'
  //script lib/js/lightbox-plus-jquery.min.js
  export default {
    data() {
      return {
        retrievalChecked: false,
        labelObj: {},
        shoppArr: [],
        params: {
          priceLevel: 'all',
          page: 1,//1
          pageSize: 3,//2
          busySize: 3,//懒加载每次返回的数据个数
          busy: false,//控制一次的懒加载
          busyEnd:false,//懒加载完成
          goodsType: [],
          sort: null//-1
        },
        goodsChecks: []
      }
    },
    components: {
      NavFooter,
      NavHeader,
      singleGoods,
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let goodsType = this.$route.query.goodsType
        let params = {}
        if (goodsType) {
          params = {
            goodsType: goodsType
          }
        }

        this.$http.get("/serverShopping/label").then((response) => {
          let res = response.data
          if (res.status === "0") {
            this.labelObj = res.result
          }
          else {
            console.dir(res)
          }
        })
        this.toshopping()
        // this.$http.post("/serverShopping/goodsCondition_base", params).then((response) => {
        //   let res = response.data
        //   if (res.status === "0") {
        //     this.shoppArr = res.result
        //   }
        //   else {
        //     console.dir(res)
        //   }
        // })
      },
      //功能栏点击删除label
      clickRemoveLabel(e) {
        let toLabelId = e.target.dataset.toId
        let labelType = Number(toLabelId.substr(13))
        let index = this.params.goodsType.indexOf(labelType)
        this.goodsChecks.splice(index, 1)
        this.params.goodsType.splice(index, 1)
        $("#" + toLabelId).removeClass('wzBtnActive')
      },
      //弹框中btn点击添加或删除label
      clickAddLabel(e) {
        let suo = true
        let elId = e.target.id
        let labelType = Number(elId.substr(13))
        let labelName = e.target.innerText
        // 重复检测
        this.params.goodsType.forEach(function (item) {
          if (Number(item) === labelType) {
            suo = false
          }
        })
        //长度检测
        if (this.params.goodsType.length > 4 && suo) return suo = false;
        if (suo) {//添加
          e.target.classList.add('wzBtnActive')
          this.goodsChecks.push({name: labelName, id: elId})
          this.params.goodsType.push(labelType)
        } else {//删除
          e.target.classList.remove('wzBtnActive')
          let index = this.params.goodsType.indexOf(labelType)
          this.goodsChecks.splice(index, 1)
          this.params.goodsType.splice(index, 1)
        }
      },
      //点击排序
      clickSort() {
        if (this.params.sort == '1')
          this.params.sort = '-1'
        else
          this.params.sort = '1'
      },
      //条件请求
      toshopping(lodeType) {
        //当lodeType存在即为true时为懒加载
        if (!lodeType) {//初次加载初始化
          this.params.page = 1
        }
        let paramsObj = {}
        for (var index in this.params) {
          if (this.params[index]) {
            paramsObj[index] = this.params[index]
          }
        }
        if (this.params.goodsType.length == 0)
          delete paramsObj.goodsType
        else
          paramsObj.goodsType = paramsObj.goodsType.join(',')
        console.log(paramsObj)
        this.$http.post("/serverShopping/goodsCondition_base", paramsObj).then((response) => {
          let res = response.data
          if (res.status === "0") {
            //初始化
            this.params.busySize = Number(res.result.length)
            this.params.busy = false
            this.params.busyEnd = false
            if (lodeType)//懒加载
              this.shoppArr = [...this.shoppArr, ...res.result]
            else//初次加载
              this.shoppArr = res.result
          }
          else {
            console.dir(res)
          }
        })
      },
      //懒加载实现
      loadMore: function () {
        this.params.busy = true;//关上锁
        if (this.params.busySize < this.params.pageSize){
          //加载完成
          this.params.busyEnd = true
          this.getAlert(1,'加载完成！')
          return
        }
        //当返回数据小于每次返回的条数时
        //说明已经没有数据了，则关上锁
        setTimeout(function () {//每一秒发送一次请求
          this.params.page = this.params.page + 1
          this.toshopping(true)
        }.bind(this), 1000)
      },
      getAlert(type,str) {
        this.$refs.alertMod.start(type,str);
      }
    }
  }
</script>
