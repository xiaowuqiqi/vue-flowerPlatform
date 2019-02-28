<template>

  <div class="full-length owl-carousel">
    <div class="introduce-mode">
      <ul>
        <wow-plus v-for="item in datesDate">
        <li >
          <div class="port">
            <div class="image-box">
              <img :src="item.imgUrl" alt="Image-2">
            </div>
            <div class="text-desc">
              <h3>{{item.title}}</h3>
              <p>{{item.content}}</p>
            </div>
          </div>
        </li>
          </wow-plus>
      </ul>

    </div>

  </div>

</template>

<script>
  export default {
    props:["datesDate"]
  }
</script>

<style scoped>
  /*div动图*/
  .introduce-mode ul {
    text-align: center;
    padding: 0;
  }

  .introduce-mode ul li {
    height: 210px;
    margin: 0 10px;
    display: inline-block;
  }

  #introduce .port * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #introduce .port {
    float: left;
    margin: 0;
    width: 300px;
    display: inline-block;
  }

  #introduce .full-length .image-box {
    height: 100%;
    width: 100%;
    vertical-align: middle;
  }

  #introduce .full-length img {
    height: 100%;
    width: 100%;
    vertical-align: middle;
  }

  #introduce .full-length {
    width: 100%;
    float: left;
    padding-bottom: 80px;
  }

  #introduce .full-length {
    margin: 0 -1.5%;
  }

  #introduce .port h3 {
    font-size: 20px;
    margin: 5px 0 10px;
  }

  #introduce .full-length .port p {
    font-weight: 300;
    line-height: 20px;
    font-size: 14px;
    margin-bottom: 15px;
  }

  #introduce .text-desc {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fff;
    height: 100%;
    opacity: 0;
    width: 100%;
    padding: 20px;
  }

  #introduce .full-length .port {
    /*height: 280px;*/
    list-style: none;
    position: relative;
    top: 0;
    overflow: hidden;
    text-align: center;
    border: 4px solid rgba(255, 255, 255, 0.9);

    /*内容溢出*/
  }

  #introduce .port {
    z-index: 10;
  }

  #introduce .port img {
    transition: 0.5s;

  }

  #introduce .port:hover {
    overflow: visible;
  }

  #introduce .port:hover img {
    transform: scale(0.5) translateY(100%);
    position: relative;
    z-index: 9;
    border: 6px solid rgba(255, 255, 255, 0.9);
  }

  #introduce .port .text-desc {
    transform: translateY(-100%);
    opacity: 0;
    padding: 20px;
    transition: 0.5s;
  }

  #introduce .port:hover .text-desc {
    transform: translateY(0px);
    opacity: 1;
  }

  /*//div动图*/
</style>
