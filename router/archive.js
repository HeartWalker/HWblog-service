
const express = require('express');
const router = express.Router();
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const filepath = require('../config').articlePath;

let format = (time) => {
   time = parseInt(time)
    let year = (new Date(time)).getFullYear();
    let month = new Date(time).getMonth() + 1;
    let day= new Date(time).getDate();

    let date = year + '-' + month + '-' + day;

    return date;
}

let archives = [];
let articles = [];
glob.sync('*', { cwd: filepath }).forEach(r => {
    articles.push(r);
    let arr = r.split('@#');
    archives.push({title:arr[0],archive:arr[1],date:format(arr[2]),time:arr[2]})

});

//所有文章目录
router.get('/archive', function(req, res){
        res.render('archive',{archives});

});

//返回当前文章内容
router.get('/archive/:id', function (req, res) {

    let readableStream = fs.createReadStream( path.join(filepath ,'/', articles[req.params.id]));
    let data = '';
    readableStream.setEncoding('utf8');
    readableStream.on('data', function(chunk){
        data += chunk;
    });
    readableStream.on('end', function(){
        res.render('home',Object.assign({},archives[req.params.id],{content: data}));
    });


});

module.exports = router;