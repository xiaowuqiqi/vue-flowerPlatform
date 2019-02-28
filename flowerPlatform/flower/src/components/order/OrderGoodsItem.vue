<template>
    <table class="userOrder-item transitionf10">

      <slot name="thead"></slot>

      <tbody>
      <tr v-for="item in orderData.orderGoods">
        <td>
          <a :href="'/#/detail?goodsId='+item.goods._id">
            <img :src="item.goods.base.CoverImgUrl" alt="" width="150px">
            <h4>{{item.goods.base.goodsName}}</h4>
          </a>
        </td>
        <td>{{item.goods.base.price|currency('￥')}}</td>
        <td><input class="goods-num" type="text" :value="item.goodsNum" disabled></td>
        <td><span class="f10red">{{item.goodsNum*item.goods.base.price|currency('￥')}}</span></td>
      </tr>

      <tr class="userOrder-message">
        <td colspan="3">
          <div class="">
            <h4>[祝福贺卡]</h4>
            <p>
              {{orderData.remark}}
            </p>
          </div>
        </td>
        <td colspan="1">
          <div class="borf10red">
            <ol>
              <li><span>{{orderData.recAddress.consignee}}</span></li>
              <li>{{orderData.recAddress.address}}</li>
              <li><em>{{orderData.recAddress.Tel}}</em></li>
              <li><i class="fa  fa-truck"></i></li>
            </ol>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
</template>

<script>
  import '../../assets/css/order/orderGoodsItem.css'

  export default {
    props: ['orderData'],
    data() {
      return {}
    }
  }
</script>

