<template>
  <div v-if="indexObj._id">
    <!--这里的判断，是当indexObj数据加载完毕后在显示下面内容
        防止数据报错
    -->
    <index-nav-header :indexScroll="indexObj.indexScroll.indexScrollDate"></index-nav-header>
    <!--==========================
        Portfolio Section
      ============================-->
    <div id="portfolio" class="section-bg">
      <div class="container">

        <header class="section-header">
          <h3 class="section-title borf10"></h3>
        </header>

        <div class="row">
          <div class="col-lg-12">
            <ul id="portfolio-flters">
              <li data-filter="*" class="filter-active">
                <wow-plus><a class="wzBtn"
                     @click="wellType='all'"
                     :class="{wzBtnActive:wellType==='all'}"
                  >All</a></wow-plus>
              </li>
              <li data-filter=".filter-app">
                <wow-plus :delay="0.2"><a class="wzBtn"
                                          @click="wellType='1'"
                                          :class="{wzBtnActive:wellType==='1'}">热卖</a></wow-plus>
              </li>
              <li data-filter=".filter-card">
                <wow-plus :delay="0.4"><a class="wzBtn"
                                          @click="wellType='2'"
                                          :class="{wzBtnActive:wellType==='2'}">新品</a></wow-plus>
              </li>
              <li data-filter=".filter-web">
                <wow-plus :delay="0.6"><a class="wzBtn"
                                          @click="wellType='3'"
                                          :class="{wzBtnActive:wellType==='3'}">经济</a></wow-plus>
              </li>
            </ul>
          </div>
        </div>
        <div class="row portfolio-container ">
          <template v-for="item in indexObj.goodsWell.wellGoods">
            <single-goods :goods="item.goods" v-show="item.wellType === wellType||wellType==='all'"></single-goods>
          </template>
        </div>

      </div>
    </div>
    <!-- #portfolio -->

    <!-- services -->

    <div class="services">
      <div class="container">
        <wow-plus>
          <div class="wzls-heading">
            <h2>我们的服务</h2>
            <p class="wow bounceInUp ">Flower diary</p>
          </div>
        </wow-plus>
        <div class="wthree-services-grids">
          <div class="col-md-6 wzls-about-left">
            <wow-plus>
              <div class="agileits-icon-grid">
                <div class="icon-left hvr-radial-out">
                  <i class="fa fa-cog" aria-hidden="true"></i>
                </div>
                <div class="icon-right">
                  <h5>Suspendisse consectetur dapibus volutpat.</h5>
                  <p>Phasellus dapibus felis elit, sed accumsan arcu gravida vitae. Nullam aliquam erat at lectus
                    ullamcorper, nec interdum neque hendrerit.</p>
                </div>
                <div class="clearfix"></div>
              </div>
            </wow-plus>
            <wow-plus>
              <div class="agileits-icon-grid">
                <div class="icon-left hvr-radial-out">
                  <i class="fa fa-heart" aria-hidden="true"></i>
                </div>
                <div class="icon-right">
                  <h5>Lorem ipsum dolor sit amet</h5>
                  <p>Phasellus dapibus felis elit, sed accumsan arcu gravida vitae. Nullam aliquam erat at lectus
                    ullamcorper, nec interdum neque hendrerit.</p>
                </div>
                <div class="clearfix"></div>
              </div>
            </wow-plus>
            <wow-plus>
              <div class="agileits-icon-grid">
                <div class="icon-left hvr-radial-out">
                  <i class="fa fa-paper-plane" aria-hidden="true"></i>
                </div>
                <div class="icon-right">
                  <h5>Suspendisse consectetur dapibus volutpat.</h5>
                  <p>Phasellus dapibus felis elit, sed accumsan arcu gravida vitae. Nullam aliquam erat at lectus
                    ullamcorper, nec interdum neque hendrerit.</p>
                </div>
                <div class="clearfix"></div>
              </div>
            </wow-plus>
          </div>
          <div class="col-md-6 wzls-about-left">
            <wow-plus>
              <div class="agileits-icon-grid">
                <div class="icon-left hvr-radial-out">
                  <i class="fa fa-user" aria-hidden="true"></i>
                </div>
                <div class="icon-right">
                  <h5>Suspendisse consectetur dapibus volutpat.</h5>
                  <p>Phasellus dapibus felis elit, sed accumsan arcu gravida vitae. Nullam aliquam erat at lectus
                    ullamcorper, nec interdum neque hendrerit.</p>
                </div>
                <div class="clearfix"></div>
              </div>
            </wow-plus>
            <wow-plus>
              <div class="agileits-icon-grid">
                <div class="icon-left hvr-radial-out">
                  <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                </div>
                <div class="icon-right">
                  <h5>Lorem ipsum dolor sit amet</h5>
                  <p>Phasellus dapibus felis elit, sed accumsan arcu gravida vitae. Nullam aliquam erat at lectus
                    ullamcorper, nec interdum neque hendrerit.</p>
                </div>
                <div class="clearfix"></div>
              </div>
            </wow-plus>
            <wow-plus>
              <div class="agileits-icon-grid">
                <div class="icon-left hvr-radial-out">
                  <i class="fa fa-bell" aria-hidden="true"></i>
                </div>
                <div class="icon-right">
                  <h5>Suspendisse consectetur dapibus volutpat.</h5>
                  <p>Phasellus dapibus felis elit, sed accumsan arcu gravida vitae. Nullam aliquam erat at lectus
                    ullamcorper, nec interdum neque hendrerit.</p>
                </div>
                <div class="clearfix"></div>
              </div>
            </wow-plus>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
    <!-- //services -->
    <!-- news -->
    <div class="news jarallax">
      <div id="jarallax-container-1"></div>
      <div class="container">
        <wow-plus>
          <div class="wzls-heading news-heading color-white">
            <h2 class="wow bounceInUp">送花日记</h2>
            <p class="wow bounceInUp ">Flower diary</p>
          </div>
        </wow-plus>
        <div class="news-grids wthree-services-grids">

          <div class=" col-md-4 section-grid-wthree">
            <div class="wow bounceInUp ">
              <div class="services-info-w3-agileits">

                <h5 class="sub-title"><a href="single.html">{{indexObj.indexDiaries.diariesGoods[0].title}}</a></h5>
                <h6>{{indexObj.indexDiaries.diariesGoods[0].createdate}} |
                  {{indexObj.indexDiaries.diariesGoods[0].weather}}<span>{{indexObj.indexDiaries.diariesGoods[0].author}}</span>
                </h6>
                <p class="para-w3">{{indexObj.indexDiaries.diariesGoods[0].content}}</p>
              </div>
              <div class="services-img-agileits-w3layouts">
                <!--添加数据-->
                <a :href="indexObj.indexDiaries.diariesGoods[0].url">
                  <wow-plus>
                    <img :src="indexObj.indexDiaries.diariesGoods[0].imgUrl" alt="">
                  </wow-plus>
                </a></div>
            </div>
          </div>
          <div class=" col-md-4 section-grid-wthree">
            <div class="wow bounceInUp" data-wow-delay="0.2s">
              <div class="services-img-agileits-w3layouts">
                <a :href="indexObj.indexDiaries.diariesGoods[1].url">
                  <wow-plus>
                    <img :src="indexObj.indexDiaries.diariesGoods[1].imgUrl" alt="">
                  </wow-plus>
                </a>
              </div>
              <div class="services-info-w3-agileits mid">
                <h5 class="sub-title"><a href="single.html">{{indexObj.indexDiaries.diariesGoods[1].title}}</a></h5>
                <h6>{{indexObj.indexDiaries.diariesGoods[1].createdate}} |
                  {{indexObj.indexDiaries.diariesGoods[1].weather}}<span>{{indexObj.indexDiaries.diariesGoods[1].author}}</span>
                </h6>
                <p class="para-w3">{{indexObj.indexDiaries.diariesGoods[1].content}}</p>
              </div>
            </div>
          </div>
          <div class=" col-md-4 section-grid-wthree">
            <div class="wow bounceInUp ">
              <div class="services-info-w3-agileits">

                <h5 class="sub-title"><a href="single.html">{{indexObj.indexDiaries.diariesGoods[2].title}}</a></h5>
                <h6>{{indexObj.indexDiaries.diariesGoods[2].createdate}} |
                  {{indexObj.indexDiaries.diariesGoods[2].weather}}<span>{{indexObj.indexDiaries.diariesGoods[2].author}}</span>
                </h6>
                <p class="para-w3">{{indexObj.indexDiaries.diariesGoods[2].content}}</p>
              </div>
              <div class="services-img-agileits-w3layouts">
                <!--添加数据-->
                <a :href="indexObj.indexDiaries.diariesGoods[2].url">
                  <wow-plus>
                    <img :src="indexObj.indexDiaries.diariesGoods[2].imgUrl" alt="">
                  </wow-plus>
                </a></div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>

      </div>
    </div>
    <!-- //news -->
    <!--一问一答-->
    <div id="faq">
      <div class="container">
        <wow-plus>
          <div class="wzls-heading">
            <h2 class="wow bounceInUp">联系客服</h2>
            <p class="wow bounceInUp">Contact Customer Service</p>
          </div>
        </wow-plus>
        <ul id="faq-list" class="">
          <wow-plus v-for="(item,index) in indexObj.indexQuestions.dates">
            <li>

              <a data-toggle="collapse" class="collapsed wow bounceInUp" :href="'#faq'+index">
                {{item.title}}
                <i class="fa fa-plus-square-o"></i>
              </a>
              <div :id="'faq'+index" class="collapse" data-parent="#faq-list">
                <p>
                  {{item.content}}
                </p>
              </div>

            </li>
          </wow-plus>
        </ul>
        <wow-plus>
          <p class="faq-service wow bounceInUp">点击<span><a href="#">联系客服</a></span>替您解决更多购花养花难题。</p>
        </wow-plus>
      </div>

    </div>
    <!--一问一答-->
    <!--花店介绍-->
    <section id="introduce">
      <div class="container">
        <wow-plus>
          <div class="wzls-heading">
            <h2 class="wow bounceInUp">我们de花店</h2>
            <p class="wow bounceInUp">Our flower shop</p>
          </div>
        </wow-plus>
        <div class="introduce-body">

          <index-introduce :datesDate="indexObj.indexStorefronts.dates"></index-introduce>

        </div>


      </div>
    </section>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import indexNavHeader from '../components/index/indexNavHeader'
  import indexIntroduce from '../components/index/indexIntroduce'
  import NavFooter from '../components/NavFooter'
  import singleGoods from '../components/SingleGoods'
  import '../assets/css/index.css'

  export default {
    data() {
      return {
        indexObj: {},
        wellType: 'all'
      }
    },
    components: {
      NavFooter,
      indexIntroduce,
      indexNavHeader,
      singleGoods,
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.$http.get("/serverIndex").then((response) => {
          let res = response.data
          if (res.status === "0") {
            this.indexObj = res.result
          }
          else {
            console.dir(res)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
