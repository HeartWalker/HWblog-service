
const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.send('hello world');
});

router.get('/article', function(req, res){
    res.render('article');
});

module.exports = router;