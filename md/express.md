res.end 不支持对象, 支持 JSON XML
res.send 支持直接写入对象到响应流中 send 内部使用 end

// :指的是占位符

` 
app.get('/products/:id', (req, res) => {
  res.send('products ' + req.params.id)
})
`

?指的是当前这个位置可有可无

``app.get('/page/:page?', (req, res) => {
  res.send('demo ' + req.params.page || 1)
})``



// use 第一个参数 指的是 pathname 以 什么 开头
`app.use('/', (req, res) => {
  // get /   post /   post /sdfsdf
  res.send('hello')
})`

// get/post/del/put/all 第一个参数 指的是 pathname 必须匹配上
`app.get('/', (req, res) => {
  res.send('hello')
})`


{{!-- hahahaha 我是服务端注释（模版引擎执行时会自动过滤掉） --}}
<!-- hahahaha 我是客户端注释 -->


*** express 生产环境最佳实践
http://expressjs.com/zh-cn/advanced/best-practice-performance.html


正则表达式()()\1\2的用法  \1表示重复正则第一个圆括号内匹配到的内容  \2表示重复正则第二个圆括号内匹配到的内容