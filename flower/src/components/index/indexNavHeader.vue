<template>
  <!-- banner -->
  <div class="banner indexbanner">
    <nav-header>
    </nav-header>
    <div class="wzlayouts-banner-slider">
      <div class="container">
        <div class="slider">
          <div class="callbacks_container">
            <ul class="rslides callbacks callbacks1" id="slider4">
              <li v-for="item in indexScroll">
                <!--v-if="index == sliderIndex"-->
                <div class="agileits-banner-info">
                  <h3>{{item.title}}<span>{{item.smallTitle}}</span></h3>
                  <div class="wz-button">
                    <a :href="item.target.url">{{item.target.Name}}</a>
                  </div>
                </div>
              </li>
            </ul>
            <!--<ol class="rslides-ol">-->
              <!--<li><a href="javascript:;"><span class="fa fa-circle-o"></span></a></li>-->
              <!--<li><a href="javascript:;"><span class="fa fa-circle"></span></a></li>-->
            <!--</ol>-->
          </div>


          <!--banner Slider starts Here-->
        </div>
      </div>
    </div>
  </div>
  <!-- //banner -->
</template>

<script>
import NavHeader from '../../components/NavHeader'
  export default {
    props:["indexScroll"],
    data() {
      return {
        sliderSetInterval: '',
        sliderIndex: 0,//滚屏第几个

      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        $("#slider4").responsiveSlides({
          auto: true,
          pager:true,
          nav:true,
          speed: 500,
          namespace: "callbacks",
          before: function () {
            $('.events').append("<li>before event fired.</li>");
          },
          after: function () {
            $('.events').append("<li>after event fired.</li>");
          }
        });
      }
    },
    components:{
      NavHeader
    },

  }
</script>

<style scoped>

</style>
