
const path = require('path');
const fs = require('fs');
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

    fs.exists(newpath, function (exists) {
        if(exists){
            let readableStream = fs.createReadStream( newpath);
            let data = '';
            readableStream.setEncoding('utf8');
            readableStream.on('data', function(chunk){
                data += chunk;
            });
            readableStream.on('error', function (error) {
                throw error;
            });
            readableStream.on('end', function(){
                res.send(Object.assign({},files[req.params.time],{content: data}));
            });

        }else{
            next();
        }

    });


});

router.get('/api/page/:num', function (req, res, next) {
    let num = req.params.num ;//请求内容起始下标
    let length = Math.ceil(archives.length/pagination);//分页长度
    let contents = {};
    contents[num]=[];
    for(let i = num * pagination;i < num * pagination + pagination;i++ ){
        contents[num].push(archives[i])
    }
    //console.log(contents[num])
    //console.log('------------+++++++++++++++++++++++++++++++++++++++++--------------------------')
    contents[num].map((v, i, arr)=>{
        let newpath =  path.join(filepath ,'/', files[v.time].name);
        fs.exists(newpath, function (exists) {
            if(exists){
                let readableStream = fs.createReadStream( newpath);
                let data = '';
                readableStream.setEncoding('utf8');
                readableStream.on('data', function(chunk){
                    data += chunk;
                });
                readableStream.on('error', function (error) {
                    arr[i].content = '';
                });
                readableStream.on('end', function(){
                    arr[i].content = data;
                    if(i === contents[num].length - 1){
                        res.send({length,content:contents[num]})
                    }
                });

            }else{
                arr[i].content = '';
                next();
            }

        });

    });

});

module.exports = router;
