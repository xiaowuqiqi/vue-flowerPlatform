<template>
  <div class="model" v-show="mdShow">
    <div class="model-body">

      <slot name="h2"></slot>
      <slot name="p"></slot>
      <div class="inputs">
        <slot name="input"></slot>
      </div>
      <div class="clearfix">
        <slot name="span"></slot>
      </div>
      <slot name="btn"></slot>
    </div>
    <div class="md-overlay" @click="closeModal"></div>
  </div>
</template>

<script>
  export default {
    props: ["mdShow"],
    data() {
      return {}
    },
    methods: {
      closeModal() {
        this.$emit("closemodal")//此处closemodal不能大写
      }
    }
  }
</script>

<style scoped>
  .model-body {
    max-width: 30%;
    position: fixed;
    z-index: 500;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
  }

  .md-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 409;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: .4;
  }

  .model-body h2 {
    margin: 10px 0;
    font-size: 30px;
    font-weight: bold;
    padding-left: 10px;
    border-left: 6px solid #18d26e;
  }

  .model-body p {
    color: #605F5F;
    margin-bottom: 20px;
  }

  .model-body span {
    color: #605F5F;
    float: right;
    margin-top: 40px;
    font-size: 12px;
  }

  .model-body a {
    float: right;
    margin: 20px 0 0 10px;
  }
  .model-body input{
    border: 1px solid #60575a;
    padding: 4px;
    margin-top: 10px;
  }
  .model-body .inputs{
    margin-top: 20px;
  }
  .model-body .inputs label{
    font-weight: 400;
  }
  .model-body .inputs i{
    margin-left: 20px;
  }
  .model-body input:focus{
    border: 1px solid #333;
  }
</style>
<!--
使用方法
    <modal :mdShow="mdShow" @closemodal="mdShow=false">
      <h2 slot="h2">确认删除么？</h2>
      <p slot="p">确认删除么？确认删除么？确认删除么？确认删除么？确认删除么？</p>
      <span slot="span" class="f10red">[小标题很小]</span>
      <div slot="btn">
        <a class="wzBtnRed2" @click="delCart">确认</a>
        <a class="wzBtn2" @click="mdShow=false">关闭</a>
      </div>
    </modal>

    使用方法2
    <modal :mdShow="mdShow" @closemodal="mdShow=false">
      <h2 slot="h2">添加收花人信息</h2>
      <label slot="input">电话：
        <input type="tel" placeholder=""><i>正确</i>
      </label>
      <label slot="input">姓名：
        <input type="text" placeholder=""><i>正确</i>
      </label>
      <label slot="input">地址：
        <input type="text" placeholder=""><i>正确</i>
      </label>
      <span slot="span" class="f10red">[小标题很小]</span>
      <div slot="btn">
        <a class="wzBtnRed2" @click="delCart">确认</a>
        <a class="wzBtn2" @click="mdShow=false">关闭</a>
      </div>
    </modal>
    -->
