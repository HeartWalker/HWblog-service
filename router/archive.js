
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

let archives = [];//
let files = {};//时间 : 文件名
function getPaths() {
    archives = [];
    files = {};
    glob.sync('*', { cwd: filepath }).forEach(r => {
        let arr = r.split('@#');
        let time = arr[2];
        let obj = { title:arr[0], archive:arr[1], date:format(arr[2]), time:arr[2]};
        archives.push(obj);
        files[time] = Object.assign({},{name:r},obj);

    });
}
//todo 文章排序
//getPaths();

//archives:[{},{}]
//archives:{time:{},time:{}}
//所有文章目录
router.get('/archive', function(req, res){
        getPaths();
        res.render('archive',{archives});

});
//返回当前文章内容
router.get('/archive/:time', function (req, res, next) {
    getPaths();
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
                res.render('home',Object.assign({},files[req.params.time],{content: data}));
            });

        }else{
            next();
        }

    });


});

//上传更新
router.post('/upload/article',function (req,res) {
    getPaths();
    let title = req.body.title,
        content = req.body.content,
        archive = req.body.archive || '',
        time = req.body.time || Date.now();
    let delimiter = '@#';
    title = title.replace(delimiter,'');
    //let filepath = path.resolve(process.cwd(),'./article');
    let newpath = filepath + '/' + [title, archive, time].join(delimiter);
    let oldpath = files[time] && filepath + '/' + files[time].name;

    //新建文章 已存在覆盖或重命名 通过时间戳判定 如果重命名删除原来的文章
    fs.writeFile(newpath, content,'utf8', (err) => {
        //if (err) throw err;

    });
    if(newpath != oldpath && oldpath){
        fs.unlink(oldpath, (err) => {
            console.log('原文修改成功 ');
        });
    }
    req.flash('success', '文章上传成功');
    res.redirect('/home');


});

//删除
router.get('/archive/delete/:time', function (req, res, next) {
    let newpath = path.join(filepath ,'/', files[req.params.time].name)
    fs.unlink(newpath, (err) => {
        console.log('删除成功 ');
    });
    res.redirect('/archive');
});


module.exports = router;

