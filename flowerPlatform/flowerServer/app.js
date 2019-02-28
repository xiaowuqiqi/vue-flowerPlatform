var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')//session
//路由
var indexRouter = require('./routes/index');
var shoppingRouter = require('./routes/shopping');
var usersRouter = require('./routes/users');
var usersFlorist = require('./routes/florist');
//工具
var util = require('./util/util')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('express-art-template'))
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//配置session
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        httpOnly: true,//前端无法用js该
        maxAge: 60 * 60 * 60 * 24 * 10//10天
    },
    resave: false,
    saveUninitialized: true
}))

//登录捕获
app.use(function (req, res, next) {
    if (req.session.user) {//已经登录，继续下面操作
        next()
    } else {//没有登录
        if (//白名单
            req.path.indexOf("/serverShopping") != -1 ||
            req.path == "/serverIndex" ||
            req.path == "/serverFlorist" ||
            req.path == "/serverUsers/login" ||
            req.path == "/serverUsers/checkLogin" ||
            req.path == "/serverUsers/pushUser"
        ) {
            next()
        } else {//没有登录不可进入的路径
            res.json({
                status: '-1',
                msg: '目前没有登录',
                result: ''
            })
        }
    }
})

// app.use('/', indexRouter);
app.use('/serverShopping', shoppingRouter);
app.use('/serverUsers', usersRouter);
app.use('/serverIndex', indexRouter);
app.use('/serverFlorist', usersFlorist);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// 错误返回中间件
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    res.json({
        status: "1",
        msg: err.message
    })
});

//连接数据库
var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/db_flower', {useNewUrlParser: true})

mongoose.connection.on("connected", function () {
    console.log("MongoDB连接成功")
})
mongoose.connection.on("error", function () {
    console.log("MongoDB连接失败")
})
mongoose.connection.on("disconnected", function () {
    console.log("MongoDB断开连接")
})
//ends
module.exports = app;

