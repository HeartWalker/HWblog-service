const path = require('path');
const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const compression = require('compression');
const hbs = require('hbs');

const config = require('./config');
const router = require('./router');

const app = express();
//启用gzip压缩 暂时无效 原因不明
app.use(compression());

// 将app的locals中所有的属性都作为模版的变量
// 此处的变量设置是全局的
hbs.localsAsTemplateData(app)
// 公共模版变量 @key 获取
Object.assign(app.locals,config.locals);


// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 hbs
app.set('view engine', 'hbs');
//设置静态文件目录
app.use('/static', express.static(path.join(__dirname, 'static')));


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
    res.status(404).send('Sorry cant find that!');
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
if (!module.parent) {
    let port = process.env.PORT || config.port;
    app.listen(port, error => {
        if (error) throw error;
        console.log(`app is ready, please visit http://localhost:${port}/`);
    })
}


