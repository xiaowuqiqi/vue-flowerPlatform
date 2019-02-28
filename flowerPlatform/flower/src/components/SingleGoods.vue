<template>
  <div class="col-md-4 col-sm-6 gallery-grid filter-app wow fadeInUp" data-wow-delay="0.1s">
    <wow-plus>
    <div class="grid clearfix">
      <div class="effect-apollo-price">
        <p class="borf10">$</p>
        <span>{{goods.base.price}}</span>
      </div>
      <figure class="effect-apollo">
        <!--<a class="example-image-link clearfix" href="/static/img/portfolio/app1.jpg" data-lightbox="example-set" data-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut sem ac lectus mattis sagittis. Donec pulvinar quam sit amet est vestibulum volutpat. Phasellus sed nibh odio. Phasellus posuere at purus sit amet porttitor. Cras euismod egestas enim eget molestie. Aenean ornare condimentum odio, in lacinia felis finibus non. Nam faucibus libero et lectus finibus, sed porttitor velit pellentesque.">-->
        <a class="example-image-link clearfix" :href="'/#/detail?goodsId='+goods._id">
          <img v-lazy="goods.base.CoverImgUrl" :key="goods.base.CoverImgUrl" alt=""/>
          <figcaption>
            <div>
              <span class="bgcf10">${{goods.base.price}}</span>
              <h3>{{goods.base.goodsName}}</h3>
              <p>{{goods.base.material+goods.base.packaging}}</p>
            </div>
          </figcaption>
        </a>
      </figure>
    </div>
      </wow-plus>
  </div>
</template>

<script>
  import '../assets/css/singleGoods.css'

  export default {
    props: ["goods"],
    data() {
      return {}
    }
  }
</script>

