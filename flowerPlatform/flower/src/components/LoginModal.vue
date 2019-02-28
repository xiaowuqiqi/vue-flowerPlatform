<template>
  <div v-if="mdShow">

      <div class="login-form fl-form ">

        <div class="login-form-top">
          <div>
            <h3>现在决定，定制爱情！</h3>
          </div>

          <p>The flower shop of Qing Fang Yuan welcomes you</p>
        </div>
        <div class="">
          <input id="loginTel" class="form-control" type="number" name="userTel" placeholder="请输入您的手机号：">
        </div>
        <div class="">
          <input id="loginPas" class="form-control" type="password" name="userPassword" placeholder="输入新的密码：">
        </div>
        <label class="che-remember">
          <input type="checkbox" checked="checked" name="">记住密码<br/>
        </label>
        <a href="#" class="forget">忘记密码？</a>
        <input type="submit" class="submit" value="登陆" @click="clickTo"><br/>
        <p class="register-goto">还没有密码？<span><a href="javascript:;" @click="clickTo">立即注册</a></span></p>

        <div class="fx login-form-min">
          <p class="login-form-left f10red">用其他方式登陆并注册：</p>
          <a href="#" class="fx-qq">
            <div></div>
          </a>
          <a href="#" class="fx-wx">
            <div></div>
          </a>
          <a href="#" class="fx-wb">
            <div></div>
          </a>
        </div>

      </div>
      <div class="login-shelter" @click="closeModal"></div>

    <alert ref="alertMod">
    </alert>
  </div>

</template>

<script>
  import '../assets/css/user/loginModal.css'

  export default {
    props: ["mdShow"],
    data() {
      return {}
    },
    methods: {
      getAlert(type, str) {
        this.$refs.alertMod.start(type, str);
      },
      clickTo() {
        let loginTel = $('#loginTel')
        let loginPas = $('#loginPas')
        if (!this.isTel(loginTel.val()))
          return this.getAlert(-1, '错误! 请输入正确手机号')
        if (!this.isPassword(loginPas.val()))
          return this.getAlert(-1, '错误! 请输入字符与数字组合的大于六位密码')
        //校验完成//登录
        this.$http.post("/serverUsers/login", {
          tel: loginTel.val(),
          password: loginPas.val(),
        }).then((response) => {
          let res = response.data
          if (res.status === "0") {
            //登录
            this.$emit("loginok", res.result.tel)
          } else if (res.status === "4") {
            this.getAlert(-1, '错误! 用户名密码错误')
          }
          else {
            console.dir(res)
          }
        })

      },
      closeModal() {
        this.$emit("closemodal")//此处closemodal不能大写
      }
    }
  }
</script>

