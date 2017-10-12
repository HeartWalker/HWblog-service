
const express = require('express');
const router = express.Router();
const glob = require('glob');
const filepath = require('../config').articlePath;

let format = (time) => {
   time = parseInt(time)
    let year = (new Date(time)).getFullYear()
    let    month = new Date(time).getMonth() + 1
    let    day= new Date(time).getDate()

    let date = year + '-' + month + '-' + day;

    return date;
}

router.get('/archive', function(req, res){
    if(req.session.user){
        let archives = [];
        glob.sync('*', { cwd: filepath }).forEach(r => {
            let arr = r.split('@#');
            archives.push({title:arr[0],archive:arr[1],time:format(arr[2])})

        })

        res.render('archive',{archives});
    } else {
        res.redirect('/sign');
    }

});

module.exports = router;