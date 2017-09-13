
const express = require('express');
const router = express.Router();

router.get('/api/test', function(req, res){
    res.send('api test');
});


module.exports = router;
