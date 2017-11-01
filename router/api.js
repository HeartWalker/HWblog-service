
const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const filepath = require('../config').articlePath;
const pagination = require('../config').pagination;
const getArchives  = require( '../tool/getArchives');

router.get('/api/test', function(req, res){
    res.send('api test');
});

router.get('/api/archives', function(req, res){
    let {archives, files } = getArchives();
    res.send(archives);
});
router.get('/api/archive/:time', function (req, res, next) {

    let files = getArchives().files ;
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
    let num = req.params.num  ;
    let length = getArchives().archives.length;
    let content = (getArchives().archives).splice(num, pagination);
    content.map((v, i, arr)=>{
        let files = getArchives().files ;
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
                    if(i === content.length - 1){
                        res.send({length,content})
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
