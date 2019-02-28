<template>
  <u-animate-container>
    <u-animate
      name="fadeInUp"
      :delay="getDelay"
      duration="0.8s"
      :iteration="1"
      :offset="0"
      animateClass="animated"
      :begin="false"
    >
      <slot></slot>
    </u-animate>
  </u-animate-container>
</template>

<script>
  import {UAnimateContainer, UAnimate} from 'vue-wow'
  import '@/assets/lib/animate/animate.css'

  export default {
    props: ["delay"],
    components: {
      //wow
      UAnimateContainer,
      UAnimate
    },
    computed:{
      getDelay(){
        return (this.delay||0)+'s'
      }
    }
  }
</script>

<style scoped>

</style>
<!--
fadeInUp下面慢慢出来
flipInX 甩两下

name	String	''	组件动画的名称class（推荐填写animate.css，如fadeIn）
duration	String	1s	动画持续时间
delay	String	0s	动画延迟时间
iteration	Number	1	动画运行次数
offset	Number	0	距离可视区域多少开始执行动画（begin参数必须为false时有效）
animateClass	String	'animated'	animation.css 动画的 class
begin	Boolean	false	是否立即执行 忽略屏幕位置计算
-->
