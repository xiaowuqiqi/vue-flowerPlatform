<template>
  <div v-if="floristObj._id">
    <nav-header>
      <h2 slot="h2">入住花艺师</h2>
    </nav-header>
    <breadcrumb :breadcrumbData="[{
           name: '主页',
           path: '/'
         },{
           name: '入驻花艺师',
           path: '/florist'
         }]"></breadcrumb>
    <!-- florist -->
    <div class="banner-bottom" id="about">
      <div class="container">

        <div class="col-md-6 banner_bottom_left">
          <wow-plus :delay="0.2">
            <h3>花艺师又称花艺设计师</h3>
          </wow-plus>
          <p>
            <wow-plus :delay="0.4">
              <i>所谓花艺师是通过花材的排列组合让花变得更加的赏心悦目</i>
            </wow-plus>
            <wow-plus :delay="0.6">
              体现花种蕴含的微妙心思，小到插花、造型、植物的摆放，大到酒店大堂、大楼中庭、小型庭院的设计，无不体现着自然与人的完美结合，形成花艺的独特语言，让欣赏者解读与感悟的花艺设计者。
            </wow-plus>
          </p>
        </div>
        <div class="col-md-6 banner_bottom_right">
          <div class="wthree_banner_bottom_right_grids">
            <wow-plus>
              <div class="col-md-6 banner_bottom_right_grid">
                <div class="view view-tenth">
                  <a data-toggle="modal" data-target="#aboutmodal">
                    <div class="agile_text_box item1">
                      <i class="fa fa-user" aria-hidden="true"></i>
                      <h3>设计分类</h3>
                      <p>
                        现如今花艺设计不仅仅只是插花设计，花艺设计分类繁多……</p>
                    </div>
                  </a>
                </div>
              </div>
            </wow-plus>
            <wow-plus :delay="0.2">
              <div class="col-md-6 banner_bottom_right_grid">
                <div class="view view-tenth">
                  <a data-toggle="modal" data-target="#aboutmodal">
                    <div class="agile_text_box item2">
                      <i class="fa fa-cog" aria-hidden="true"></i>
                      <h3>空间设计</h3>
                      <p>
                        空间花艺设计年作为2012世界花艺与装饰界的重头戏是空……</p>
                    </div>
                  </a>
                </div>
              </div>
            </wow-plus>
            <div class="clearfix"></div>
          </div>
          <div class="wthree_banner_bottom_right_grids">
            <wow-plus :delay="0.4">
              <div class="col-md-6 banner_bottom_right_grid">
                <div class="view view-tenth">
                  <a data-toggle="modal" data-target="#aboutmodal">
                    <div class="agile_text_box item3">
                      <i class="fa fa-anchor" aria-hidden="true"></i>
                      <h3>适用行业</h3>
                      <p>
                        空间花艺装饰设计主要以高端婚礼策划、名流宴会活动策划……</p>
                    </div>
                  </a>
                </div>
              </div>
            </wow-plus>
            <wow-plus :delay="0.6">
              <div class="col-md-6 banner_bottom_right_grid">
                <div class="view view-tenth">
                  <a data-toggle="modal" data-target="#aboutmodal">
                    <div class="agile_text_box item4">
                      <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                      <h3>婚礼设计</h3>
                      <p>
                        婚礼花艺设计、策划已经开始转为高级定制，高端花材、高端……</p>
                    </div>
                  </a>
                </div>
              </div>
            </wow-plus>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <!-- team -->
    <div class="team jarallax">
      <div class="container">
        <wow-plus>
          <div class="wzls-heading color-white">
            <h2>入驻花艺师</h2>
            <p>Afweflag vaw</p>
          </div>
        </wow-plus>
        <div class=" wthree-services-grids">

          <div class="col-md-3 agile_team_grid" v-for="item in floristObj.floristMod.date">
            <wow-plus>
              <div class="view w3-agile-view">
                <img :src="item.imgUrl" alt=" " class="img-responsive"/>
                <div class="w3lmask">
                  <h5>{{item.title}}</h5>
                  <p>
                    {{item.content}}<br/>
                  </p>
                  <div class="social">
                    <ul>
                      <li>
                        <a href="#"><i class="fa fa-facebook"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="fa fa-rss"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </wow-plus>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
    <!-- //team -->
    <!-- choose -->
    <div class="w3-agileits-choose">
      <div class="container">
        <wow-plus>
          <div class="wzls-heading">
            <h3>为什么，选择我们?</h3>
          </div>
        </wow-plus>
        <div class="wthree-services-grids">
          <wow-plus :delay="0.2">
            <div class="col-sm-4 agile-choose-grid">
              <div class="choose-icon">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
              <div class="choose-info">
                <h4>经营目标</h4>
                <p>
                  创中国鲜花时尚产业网上优秀品牌，打造一流网络情感传递服务商，让千里真情，瞬间传递！
                </p>
              </div>
            </div>
          </wow-plus>
          <wow-plus :delay="0.4">
            <div class="col-sm-4 agile-choose-grid">
              <div class="choose-icon">
                <i class="fa fa-cogs" aria-hidden="true"></i>
              </div>

              <div class="choose-info">
                <h4>服务准则</h4>
                <p>
                  便捷（千里真情，瞬间传递）；热情（让顾客听到我们的微笑）；真诚（全心全意为顾客着想）；周全（为客户做一切可能做的事）；可靠（给顾客一个放心的购物环境）；专业（让顾客感觉我们个个是专家）；细心（对每一个细节尽力做到更好）
                </p>
              </div>

            </div>
          </wow-plus>
          <wow-plus :delay="0.6">
            <div class="col-sm-4 agile-choose-grid">
              <div class="choose-icon">
                <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
              </div>
              <div class="choose-info">

                <h4>经营理念</h4>
                <p>
                  我们的理念是：以顾客为导向，以品质为生命，以一丝不苟的敬业精神，以团队间紧密合作，真诚讲信用的合作理念来创造一套双赢的合作体系，从而共同创造更多价值。
                </p>
              </div>
            </div>
          </wow-plus>
        </div>
      </div>
    </div>
    <!-- //choose -->
    <!-- //florist -->
    <nav-footer>

    </nav-footer>
  </div>
</template>

<script>
  import NavHeader from '../components/NavHeader'
  import NavFooter from '../components/NavFooter'
  import singleGoods from '../components/SingleGoods'
  import '../assets/css/florist.css'

  export default {
    data() {
      return {
        floristObj: {}
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
        this.$http.get("/serverFlorist").then((response) => {
          let res = response.data
          if (res.status === "0") {
            this.floristObj = res.result
          }
          else {
            console.dir(res)
          }
        })
      }
    }
  }
</script>

