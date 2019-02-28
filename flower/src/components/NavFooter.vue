<template>
    <div>
      <div class="flbj">
        <img src="/static/images/bjfl8.png" />
      </div>
      <!-- footer -->
      <footer>
        <div class="container">
          <div class="agileits-wzlayouts-footer-grids">
            <div class="col-md-4 footer-left">
              <h3>
                <a href="index.html">Qfy <span>鲜花店</span></a>
              </h3>
              <div class="footer-social-grids">
                <ul>
                  <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                  <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                  <li><a href="#"><i class="fa fa-rss"></i></a></li>
                </ul>
              </div>
            </div>
            <div class="col-md-4 footer-left">
              <h4>Navigation</h4>
              <div class="col-md-6 footer-grid-left">
                <ul>
                  <li><a class="active" href="index.html">Home</a></li>
                  <li><a href="about.html">Florist</a></li>
                  <li><a href="gallery.html">Flower shop</a></li>
                  <li><a href="icons.html">Flower knowledge</a></li>
                </ul>
              </div>
              <div class="col-md-6 footer-grid-left">
                <ul>
                  <li><a href="typography.html">About</a></li>
                </ul>
              </div>
              <div class="clearfix"> </div>
            </div>
            <div class="col-md-4 footer-left">
              <h4>Newsletter</h4>
              <p>搜索更多信息</p>
              <form action="#" method="post">
                <input type="email" placeholder="关键词" name="Subscribe" required="">
                <button class="btn1">Go</button>
              </form>
            </div>
            <div class="clearfix"> </div>
          </div>
        </div>
      </footer>
      <!-- footer -->
      <!-- copyright -->
      <div class="copyright">
        <div class="container">
          <p>© 2019 Flower shop. All rights reserved | Design by <a href="http://baidu.com">WZ</a></p>
        </div>
      </div>
      <!-- //copyright -->
    </div>
</template>

<script>
    export default {
        name: "NavFooter"
    }
</script>

<style scoped>
.flbj img{
  width: 250px;
  display: block;
  margin: -20px auto -4px;
}
</style>
