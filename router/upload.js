const express = require('express');
const router = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/images/')
  },
  filename: function (req, file, cb) {
    console.log(file);
    let fileName = file.originalname;
    //获取文件扩展类型名
    let extension = fileName.slice(fileName.lastIndexOf("."));
    //cb(null, fileName + '-' + Date.now());
    let imgname = req.body.imgname
    //todo 重名时处理
    if(imgname){
      //使用原始文件名
      cb(null, imgname + extension);
    }else{
      cb(null, fileName);
    }

  }
})

function fileFilter (req, file, cb) {
  //获取上传文件的mime 类型 非image的拒绝
  let mimetype = file.mimetype.slice(0,file.mimetype.indexOf('/'));
  if(mimetype === 'image'){
    // 接受这个文件，使用`true`, 像这样:
    cb(null, true)
  }else {
    // 拒绝这个文件，使用`false`, 像这样:
    cb(null, false)
  }
  // 这个函数应该调用 `cb` 用boolean值来
  // 指示是否应接受该文件

  // 如果有问题，你可以总是这样发送一个错误:
  //cb(new Error('I don\'t have a clue!'))

}
const upload = multer({
  storage: storage ,
  fileFilter: fileFilter
})
/*const upload = multer({ dest: 'static/images/' })*/



router.post('/upload/img', upload.single('avatar'), function (req, res, next) {
  console.log('---------------------------------------------------------======================================================')
  console.log(req.file)
  console.log('---------------' +
    '------------------------------------------+++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
  if(!req.file){
    res.send('请上传正确的图片类型');
    //res.send('上传成功');
  }else {
    res.send('上传成功');

    //res.send('请上传正确的图片类型');
  }
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据, 如果存在的话

})


module.exports = router;