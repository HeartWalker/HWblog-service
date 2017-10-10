
const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('sign');
});


router.get('/home', function(req, res){
    if(req.session.user){
        res.render('home');
    } else {
        res.redirect('/sign');
    }

});

module.exports = router;