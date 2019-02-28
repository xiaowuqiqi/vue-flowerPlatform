<template>
  <div class="alertModal" v-show="mdShow">
    <div class="alert alert-dismissable" :class="gettype">
      <!--<button type="button" class="close" data-dismiss="alert"-->
      <!--aria-hidden="true">-->
      <!--&times;-->
      <!--</button>-->
      <p>{{str}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        str: "sss",
        alerttype: 1,
        mdShow: false
      }
    },
    methods: {
      start(type, str, time) {
        this.str = str
        this.alerttype = type
        this.mdShow = true
        let _this = this
        let t = time || 2.5
        setTimeout(function () {
          _this.mdShow = false
        }, t * 1000)
      }
    },
    computed: {
      gettype() {
        //2成功，1正常，0注意，-1错误
        switch (this.alerttype) {
          case 2:
            return 'alert-success'
          case 1:
            return 'alert-info'
          case 0:
            return 'alert-warning'
          case -1:
            return 'alert-danger'
        }
      }
    }
  }
</script>

<style scoped>
  .alertModal {
    position: fixed;
    z-index: 99999;
    bottom: 20px;
    left: 50%;
    /*width: 50%;*/
    transform: translateX(-50%);
    text-align: center;
    /*font-size: 20px;*/
  }
</style>
<!--
使用方式：
html
<alert ref="alertMod"></alert>
js
getAlert(type,str) {
  this.$refs.alertMod.start(type,str);
},
-->
