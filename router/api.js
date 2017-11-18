
const path = require('path');
const express = require('express');
const router = express.Router();
const filepath = require('../config').articlePath;
const pagination = require('../config').pagination;

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

router.get('/api/archive/:time', function (req, res, next) {

    let newpath =  path.join(filepath ,'/', files[req.params.time].name);

    global.readFiles(res,req,next,newpath).then(
        value=>{res.send(Object.assign({},files[req.params.time],{content: value}));}
    )

});

router.get('/api/page/:num', function (req, res, next) {
    let num = req.params.num || 0;//请求内容起始下标
    let length = Math.ceil(archives.length/pagination);//分页长度

    let contents = [];
    contents = archives.slice(num * pagination, num * pagination + pagination);

    contents.map((v, i, arr)=>{
        let newpath =  path.join(filepath ,'/', files[v.time].name);
        global.readFiles(res,req,next,newpath).then(
            value => {
                arr[i].content = value;
                if(i === contents.length - 1){
                    res.send({length,content:contents});
                }
            }
        )

    });

});

module.exports = router;
