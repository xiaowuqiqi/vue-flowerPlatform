import BreadcrumbVue from './Breadcrumb.vue'
// 这里是重点
const Breadcrumb = {
  install: function(Vue){
    Vue.component('Breadcrumb',BreadcrumbVue)
  }
}

// 导出组件
export default Breadcrumb
