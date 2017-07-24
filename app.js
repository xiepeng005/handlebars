var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var mysql = require('mysql');
var myConnection = require('express-myconnection');
var session = require('express-session');
var fs = require('fs');
var fileStreamRotator = require('file-stream-rotator');
// routers
var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//register partials and helper
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('css', function (str, option) {
    var cssList = this.cssList || [];
    str = str.split(/[,，;；]/);
    str.forEach(function (item) {
        if(cssList.indexOf(item) < 0){
            cssList.push(item);
        }
    });
    this.cssList = cssList.concat();
});
hbs.registerHelper('js', function (str, option) {
    var jsList = this.jsList || [];
    str = str.split(/[,，;；]/);
    str.forEach(function (item) {
        if(jsList.indexOf(item) < 0){
            jsList.push(item);
        }
    });
    this.jsList = jsList.concat();
});
//mysql connection
var dbOptions = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3308,
    database: 'renrenchao'
};
app.use(myConnection(mysql, dbOptions, 'single'));

//mongan logger
var logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
logger.format('mylogger',':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms');
var accessLogStream = fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory,'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(logger('mylogger',{stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'http://www.xiaobaos.com',
    name: 'handles',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60
    },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    domain:"/",
    resave: false,
    saveUninitialized: false
}));
//router
app.use('/', index);
app.use('/home', home);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

