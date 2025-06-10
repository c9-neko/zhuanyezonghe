var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Routers = require('./routes');
var session = require('express-session');
var bodyParser = require('body-parser')
var app = express();
const formidable = require('express-formidable') // 引入
//设置允许跨域访问该服务.

app.all('', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
// 处理异常
const error = require('./middleware/error');
app.use(error);
app.use(cookieParser());
// session
app.keys = ['session app keys'];
app.use(session({
secret: '12345',
name: 'name',
cookie: {maxAge: 60000},
resave: false, 
saveUninitialized: true
}));
app.use((req, res, next) => {
  // req.state.user = req.session.user;
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 判断是否登录
// const isLogin = require('./middleware/isLogin');
// app.use(isLogin);


// 解析数据
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
// app.use(formidable)


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname));


app.use('/', Routers);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
