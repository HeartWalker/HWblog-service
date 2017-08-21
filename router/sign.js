
const express = require('express');
const router = express.Router();

router.get('/sign', function(req, res){
    res.render('sign');
});

router.post('/sign', function(req, res){
    if(req.body.user === 'ztl' && req.body.password === "147"){
        req.session.user = req.body.user;
        res.redirect('/article');
    } else {
        res.redirect('/sign');
    }

});

module.exports = router;
