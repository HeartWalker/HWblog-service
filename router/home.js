
const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('sign');
 });

router.get('/home', function(req, res){
        res.render('home');

});

module.exports = router;