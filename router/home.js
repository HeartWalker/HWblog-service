
const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.send('hello world');
});


router.get('/article', function(req, res){
    if(req.session.user){
        res.render('article');
    } else {
        res.redirect('/sign');
    }

});

module.exports = router;