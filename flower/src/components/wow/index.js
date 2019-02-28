import wowPlusVue from './wowPlus.vue'
// 这里是重点
const WowPlus = {
  install: function(Vue){
    Vue.component('WowPlus',wowPlusVue)//这里的WowPlus就是<wow-plus>
  }
}

// 导出组件
export default WowPlus
