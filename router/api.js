
const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const filepath = require('../config').articlePath;
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


module.exports = router;
