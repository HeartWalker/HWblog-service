
const fs = require('fs');
/*
* Absolute path to read file
* @params:{string} filepath
* */
const  readFiles = (res,req,next,filepath) => new Promise((resolve, reject) => {

    if(readFiles.articles[filepath]){
        resolve(readFiles.articles[filepath]);
        return;
    }

    let data = '';
    let readableStream = fs.createReadStream( filepath);
    readableStream.setEncoding('utf8');
    readableStream.on('data', function(chunk){
        data += chunk;
    });
    readableStream.on('error', function (error) {
        resolve("");
        //reject(error);
    });
    readableStream.on('end', function(){
        readFiles.articles[filepath] = data;
        resolve(data);
    });

});
readFiles.articles = {};
module.exports = readFiles;
