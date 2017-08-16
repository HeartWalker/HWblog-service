
const express = require('express');
const router = express.Router();
const glob = require('glob');

glob.sync('./!(index)*.js', { cwd: __dirname }).forEach(r => {
    router.use(require(r));
})

module.exports = router;