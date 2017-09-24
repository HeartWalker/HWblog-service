const path = require('path');
const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const compression = require('compression');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const config = require('./config');
const router = require('./router');

const app = express();

/*******************************************************************************************/
//启用gzip压缩 暂时无效 原因不明
app.use(compression());

/*******************************************************************************************/
// 将app的locals中所有的属性都作为模版的变量
// 此处的变量设置是全局的
hbs.localsAsTemplateData(app);
// 公共模版变量 @key 获取
Object.assign(app.locals,config.locals);

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 hbs
app.set('view engine', 'hbs');
//设置静态文件目录
app.use('/static', express.static(path.join(__dirname, 'static')));

/*******************************************************************************************/
//解析请求体
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/*******************************************************************************************/
// session 中间件
app.use(session({
    name: 'admin',// 设置 cookie 中保存 session id 的字段名称
    secret: 'heartwalker',// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: false,// 强制更新 session
    saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: 60000// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    /*store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })*/
}));

/*******************************************************************************************/
// flash 中间件，用来显示通知
app.use(flash());

app.use(function (req, res, next) {
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

/*******************************************************************************************/
// 正常请求的日志
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}));

// 路由
app.use(router);

//404
app.use(function(req, res, next) {
    res.status(404).send(`Sorry can't find that!`);
});



// 错误请求的日志
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}));



//错误处理
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// app listen
if (!module.parent && (process.env.NODE_ENV != 'development')) {
    let port = process.env.PORT || config.port;
    app.listen(port, error => {
        if (error) throw error;
        console.log(`app is ready, please visit http://localhost:${port}/`);
    })
}


