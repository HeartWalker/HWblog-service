
const express = require('express');
const router = express.Router();

router.get('/api/test', function(req, res){
    res.send('api test');
});

router.get('/api/articles', function(req, res){
    res.send('api test');
});


module.exports = router;
