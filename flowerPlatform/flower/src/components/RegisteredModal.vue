<template>
  <div v-if="mdShow">

    <div class="login-form fl-form ">
      <div class="login-form-top">
        <div>
          <h3>现在决定，定制爱情！</h3>
        </div>

        <p>The flower shop of Qing Fang Yuan welcomes you</p>
      </div>
      <div :class="{'has-error':errInput == 0}">
        <input type="number" id="userTel" name="userTel" placeholder="请输入您的手机号：" class="form-control"
        >
      </div>
      <div :class="{'has-error':errInput == 1}">
        <input type="password" id="userPassword" name="userPassword" placeholder="输入新的密码：" class="form-control"
        >
      </div>
      <div :class="{'has-error':errInput == 2}">
        <input type="password" id="userPassword2" name="userPassword2" placeholder="再次输入密码：" class="form-control"
        >
      </div>
      <div :class="{'has-error':errInput == 3}">
        <input type="email" id="userEmail" name="userEmail" placeholder="Email(可选)" class="email form-control"
        >
      </div>
      <label>
        <input type="checkbox" id="userProtocol" checked="checked" name="userProtocol" required="">
        已阅读并同意签署<a>《用户注册协议》</a><br/>
      </label>
      <input type="submit" class="submit" value="注册" @click="clickTo"><br/>

      <div class="fx login-form-min">
        <p class="register-form-right">已经有账户？现在
          <a href="landgo.html">登陆</a>！</p>
        <p class="register-form-left f10red">用其他方式登陆并注册：</p>
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
    <alert ref="alertMod"></alert>
  </div>
</template>

<script>

  export default {
    props: ["mdShow"],
    data() {
      return {
        errInput: -1
      }
    },
    methods: {
      getAlert(type, str) {
        this.$refs.alertMod.start(type, str);
      },
      clickTo() {
        let RegTel = $('#userTel')
        let RegPas = $('#userPassword')
        let RegPas2 = $('#userPassword2')
        let RegEmail = $('#userEmail')
        if (!this.isTel(RegTel.val())) {
          this.getAlert(-1, '错误! 注册电话校验错误，请输入正确手机号')
          RegTel.focus()
          this.errInput = 0
          return
        }

        if (!this.isPassword(RegPas.val())) {
          this.getAlert(-1, '错误! 密码校验错误，请输入字符与数字组合的大于六位密码')
          RegPas.focus()
          this.errInput = 1
          return
        }

        if (RegPas.val() !== RegPas2.val()) {
          this.getAlert(-1, '错误! 确认密码与密码不同')
          RegPas2.focus()
          this.errInput = 2
          return
        }

        if (RegEmail.val())
          if (!this.isEmail(RegEmail.val())) {
            this.getAlert(-1, '错误! Email输入格式不正确')
            RegEmail.focus()
            this.errInput = 3
            return
          }

        //校验完成//注册
        this.$http.post("/serverUsers/pushUser", {
          tel:RegTel.val(),
          password:RegPas.val(),
          email:RegEmail.val(),
        }).then((response) => {
          let res = response.data
          if (res.status === "0") {
            //登录
            this.$emit("loginok",res.result.tel)
          }else if(res.status === "3"){
            this.getAlert(-1, '手机号已存在! 您注册的手机号已存在')
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

<style scoped>

</style>
