const express = require('express');
const router = express.Router();

router.post('/upload/article',function (req,res) {
    let title = req.body.title,
        content = req.body.content,
        time = Date.now();
    console.log(req)
});


module.exports = router;