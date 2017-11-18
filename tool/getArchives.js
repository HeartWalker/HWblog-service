const glob = require('glob');
const filepath = require('../config').articlePath;

let format = (time) => {
    time = parseInt(time)
    let year = (new Date(time)).getFullYear();
    let month = new Date(time).getMonth() + 1;
    let day= new Date(time).getDate();
    let date = year + '-' + month + '-' + day;
    return date;
}
//archives:[{},{}]
//files:{time:{},time:{}}
function getArchives() {
    if(getArchives.expire){
        return;
    }
    let archives = [];//
    let files = {};//时间 : 文件名
    glob.sync('*', { cwd: filepath }).forEach(r => {
        let arr = r.split('@#');
        let time = arr[2];
        let obj = { title:arr[0], archive:arr[1] || 'default', date:format(arr[2]), time:arr[2]};
        archives.push(obj);
        files[time] = Object.assign({},{name:r},obj);

    });
    archives.sort(function (a, b) {
        return a.time < b.time;
    });

    getArchives.archives = archives
    getArchives.files = files
    getArchives.expire = true //目录缓存标记
}

module.exports = getArchives
