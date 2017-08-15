
const express = require('express');
const router = express.Router();
const glob = require('glob');

glob.sync('./!(index)*.js', { cwd: __dirname }).forEach(r => {
    const routers = require(r);
    router.use(routers);
})



module.exports = router;