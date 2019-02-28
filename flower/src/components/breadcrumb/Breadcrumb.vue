<template>
  <wow-plus :delay="0.2">
    <div class="container">
      <div class="bread">
        <span class="fa fa-dot-circle-o  borf10 f10"></span>

        <ol class="breadcrumb ">
          <li v-for="item in breadcrumb">
            <router-link class="f10 " :to="item.path">{{item.name}}</router-link>
          </li>
          <li class="active">
            <span>{{list.name}}</span>
          </li>
        </ol>

        <div class="breadcrumb-bor transitionf10 bgcf10"></div>
      </div>
    </div>
  </wow-plus>
</template>

<script>
  import '@/assets/css/breadcrumb.css'
  export default {
    props: ["breadcrumbData"],
    data() {
      return {
        breadcrumb: [],
        list: ''
        // breadcrumbData: [{
        //   name: '主页',
        //   path: 'a'
        // }, {
        //   name: '主页',
        //   path: 'a'
        // }]
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        for (let i = 0; i < this.breadcrumbData.length - 1; i++) {
          this.breadcrumb.push(this.breadcrumbData[i])
        }
        this.list = this.breadcrumbData[this.breadcrumbData.length - 1]
      }
    }
  }
</script>

<style scoped>

</style>
