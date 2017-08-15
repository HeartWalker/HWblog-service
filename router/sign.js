
const express = require('express');
const router = express.Router();

router.get('/sign', function(req, res){
    res.render('sign');
});

module.exports = router;
