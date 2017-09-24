const gulp = require('gulp');
// 调用 .create() 意味着你得到一个唯一的实例并允许您创建多个服务器或代理。
const browserSync = require('browser-sync').create();
// 这里reload不加括号，只引用不调用
//var reload = browserSync.reload;
const nodemon = require('gulp-nodemon');
const config = require('./config');

gulp.task('default', function() {
    nodemon({
        script: 'index.js',
        // 忽略部分对程序运行无影响的文件的改动，nodemon只监视js文件，可用ext项来扩展别的文件类型
        ignore: ["node_modules/", "public/"],
        env: {
            'NODE_ENV': 'development'
        }
    }).on('start', function() {
        browserSync.init({
            proxy: `http://localhost:${config.port}`,
            files: ["./views/", "./static/css/"],
            port: 3001
        }, function() {
            console.log("browser refreshed.");
        });
        /*gulp.watch("./views/").on("change", browserSync.reload);
        gulp.watch("./static").on("change", browserSync.reload);*/
    });
});