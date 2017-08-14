const path = require('path');
const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();


// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 hbs
app.set('view engine', 'hbs');
//设置静态文件目录
app.use('/static', express.static(path.join(__dirname, 'views')));


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
app.get('/', function(req, res){
    res.send('hello world');
});

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


app.listen(3000);


