const fs = require('fs');
//const path = require('path');
const express = require('express');
const filepath = require('../config').articlePath;
const router = express.Router();

router.post('/upload/article',function (req,res) {
    let title = req.body.title,
        content = req.body.content,
        archive = req.body.archive || '',
        time = req.body.time || Date.now();
    let delimiter = '@#';
    title = title.replace(delimiter,'');
    //let filepath = path.resolve(process.cwd(),'./article');
    let filename =filepath + '/' + [title, archive, time].join(delimiter);
    //todo 如果目录不存在新建 已存在覆盖或重命名 通过时间戳判定

    fs.writeFile(filename, content,'utf8', (err) => {
        if (err) throw err;
        req.flash('success', '文章上传成功');
        //res.send('文章上传成功');
        res.redirect('/home');
    });
});


module.exports = router;