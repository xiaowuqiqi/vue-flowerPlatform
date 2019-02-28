//手机号
//13[0-9] 15[0-9] 17[0-9] 14[0-9] 18[0-9]
// '[1][35748][0-9]{9}'

//邮箱正则（记住）
//sd123123_3.-fd@itca._-520.com
// '^([\da-zA-Z_.-]+)[@][\da-zA-Z_.-]+(([.][a-zA-Z]+){1,2})$'

//密码
//'^[a-zA-Z\d_]{8,}$'
exports.install = function (Vue, options) {
  Vue.prototype.isPassword =  function (s) {
    var patrn = /^(?=.*[a-z])(?=.*\d)[^]{6,16}$/;
    if (!patrn.exec(s)) return false
    return true
  }

  Vue.prototype.isEmail = function(s) {
    var patrn = /^([\da-zA-Z_.-]+)[@][\da-zA-Z_.-]+(([.][a-zA-Z]+){1,2})$/;
    if (!patrn.exec(s)) return false
    return true
  }

  Vue.prototype.isTel = function(s) {
    var patrn = /[1][35748][0-9]{9}/;
    if (!patrn.exec(s)) return false
    return true
  }
}
