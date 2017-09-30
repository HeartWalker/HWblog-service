const express = require('express');
const router = express.Router();

router.post('/upload/article',function (req,res) {
    console.log(req)
});


module.exports = router;