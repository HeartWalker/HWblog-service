const path = require('path');

module.exports = {
    port: 3000,
    locals: {//全局变量
        site_name: 'hw',//title
    },
    articlePath: path.resolve(process.cwd(),'./article'),

}
