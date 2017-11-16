
const path = require('path');
const express = require('express');
const router = express.Router();
const filepath = require('../config').articlePath;
const pagination = require('../config').pagination;
const readFile = require('../tool/readFile');
require('../tool/global');
global.getArchives();
let archives = global.getArchives.archives;
let files = global.getArchives.files;

router.use('/api',function (req, res, next) {
    global.getArchives();
    next();
})

router.get('/api/test', function(req, res){
    res.send('api test');
});

router.get('/api/archives', function(req, res){
    res.send(archives);
   // console.log(archives)
    //console.log('--------------------------------------')
});
//TODO 缓存每篇文章
//todo 预读所有文章

router.get('/api/archive/:time', function (req, res, next) {

    let newpath =  path.join(filepath ,'/', files[req.params.time].name);

    readFile(res,req,next,newpath).then(
        value=>{res.send(Object.assign({},files[req.params.time],{content: value}));}
    )

});

let contents = {};
let length = Math.ceil(archives.length/pagination);//分页长度
router.get('/api/page/:num', function (req, res, next) {
    let num = req.params.num || 0;//请求内容起始下标
    let newlength = Math.ceil(archives.length/pagination);//分页长度
    //内容是否更新,判断length是否变化
    if(!global.getArchives.cacheContent || length != newlength){
        contents = {};
        length = newlength;
        global.getArchives.cacheContent = true;
    }

    if(contents[num]){ //请求的当前组是否已经存在
        res.send({length,content:contents[num]});
        return;

    }
    global.getArchives.cacheContent = true;

    contents[num] = archives.slice(num * pagination, num * pagination + pagination);

    contents[num].map((v, i, arr)=>{
        let newpath =  path.join(filepath ,'/', files[v.time].name);
        readFile(res,req,next,newpath).then(
            value => {
                arr[i].content = value;
                if(i === contents[num].length - 1){
                    res.send({length,content:contents[num]});
                }
            }
        )

    });

});

module.exports = router;
