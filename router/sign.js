
const express = require('express');
const router = express.Router();

router.get('/sign', function(req, res){
    res.render('sign');
});

router.post('/sign', function(req, res){
    if(req.body.user === 'ztl' && req.body.password === "147"){
        req.session.user = req.body.user;
        req.flash('success', '登录成功');
        res.redirect('/home');
    } else {
      req.flash('error', '账号或密码错误');
      res.redirect('/sign');

    }

});

module.exports = router;
