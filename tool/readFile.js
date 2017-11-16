const fs = require('fs');
const  getArticle = (res,req,next,newpath) => new Promise((resolve, reject) => {
    let data = '';
    let readableStream = fs.createReadStream( newpath);
    readableStream.setEncoding('utf8');
    readableStream.on('data', function(chunk){
        data += chunk;
    });
    readableStream.on('error', function (error) {
        resolve("");
        //reject(error);
    });
    readableStream.on('end', function(){
        resolve(data);

    });

});

module.exports = getArticle;