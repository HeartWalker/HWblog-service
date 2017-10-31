
const express = require('express');
const router = express.Router();
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const filepath = require('../config').articlePath;
const getArchives  = require( '../tool/getArchives');


let {archives, files } = getArchives();
//所有文章目录
router.get('/archive', function(req, res){
        archives = getArchives().archives;
        res.render('archive',{archives});

});
//返回当前文章内容
router.get('/archive/:time', function (req, res, next) {
    files = getArchives().files ;
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

//归档
router.get('/archive/archive/:archive', function(req, res){
    archives = getArchives().archives;
    let arc = archives.filter(function (value, index) {
        return value.archive === req.params.archive;
    });
    //console.log(req.params.archive)
    res.render('archive',{archives:arc,archive:req.params.archive});

});

//上传更新
router.post('/upload/article',function (req,res) {
    files = getArchives().files ;
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

