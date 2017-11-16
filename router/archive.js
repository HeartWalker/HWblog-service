
const express = require('express');
const router = express.Router();
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const filepath = require('../config').articlePath;
const readFile = require('../tool/readFile');

require('../tool/global');
global.getArchives();
let archives = global.getArchives.archives;
let files = global.getArchives.files;
router.use('/archive',function (req, res, next) {
    global.getArchives();
    next();
})

//所有文章目录
router.get('/archive', function(req, res){
        res.render('archive',{archives});

});
//返回当前文章内容
router.get('/archive/:time', function (req, res, next) {
    let newpath =  path.join(filepath ,'/', files[req.params.time].name);
    readFile(res,req,next,newpath).then(
        value=>{res.render('home',Object.assign({},files[req.params.time],{content: value}));}
    )

});

//归档
router.get('/archive/archive/:archive', function(req, res){
    let arc = archives.filter(function (value, index) {
        return value.archive === req.params.archive;
    });
    //console.log(req.params.archive)
    res.render('archive',{archives:arc,archive:req.params.archive});

});

//上传更新
router.post('/upload/article',function (req,res) {
    global.getArchives();
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
        global.getArchives.expire = false;

    });
    if(newpath != oldpath && oldpath){
        fs.unlink(oldpath, (err) => {
            console.log('原文修改成功 ');
        });
        global.getArchives.expire = false;
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

