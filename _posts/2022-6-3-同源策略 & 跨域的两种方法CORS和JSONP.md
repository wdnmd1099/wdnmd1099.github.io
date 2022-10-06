# [完整代码]()


# 同源策略

定义：地址不完全相同的网站不能获取对方的数据内容


哪怕是域名，ip，端口，等等有不一样的地方，都不能获取对方不想被获取的数据


因为历史原因，当年的服务器和带宽都十分昂贵，一个服务器可以跑很多网站，所以浏览器需要定
制一个策略来限制不同网站间的数据获取，

否则所有网站的数据都会被泄露，浏览器就变成一个纯纯的病毒。

--------------

数据可以被引用，但不能被获取

比如一个网站A的js文件，它可以被网站B下载，运行，但是如果它不想被网站B看到源代码，浏览器就不会把源码展示出来，这是浏览器为数据安全作出的隔离策略，叫同源策略。

那么如果两家网站需要共享某些数据怎么办？

跨域需求就应运而生

# 跨域

## CORS 跨域

只需要在后台把需要共享的数据设置头为对方地址，对方就可以获取到这个数据。

比如我想共享数据给ip为127.0.0.1，端口为8889的网站好友的信息，那么我只需要在后台设置一个头，输入对方的地址就可以了，数据就定向共享出去了。
```js
response.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:8889')
```


```js
else if(path === '/friends.json'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:8889') //localhost === 127.0.0.1
    response.setHeader('Access-Control-Allow-Origin','http://localhost:8889')
    response.write(fs.readFileSync('./public/friends.json'))
    response.end()
}
```
在接收数据的网站写：AJAX请求对方的数据地址，然后打印出获取的数据
```js
const request = new XMLHttpRequest()
request.open('GET', 'http://127.0.0.1:8888/friends.json')
request.onreadystatechange = ()=>{
  if(request.readyState===4 && request.status === 200){
    console.log(request.response)
  }
}
request.send()
```


---------------------


## JSONP 跨域
很不幸的是，IE 6，7，8，9并不支持CORS跨域

所以如果需要为IE做跨域，只能另辟蹊径，前端工程师想出了一种方法，把数据打包在js里，用js发送这些数据出去。


你需要先创建一个用来装数据分享出去的js文件

然后把需要共享的数据替换到js里，然后响应发送出去。
```js
else if(path === '/friends.js'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    const string1 = fs.readFileSync('./public/friends.js').toString();
    const data = fs.readFileSync('./public/friends.json').toString();
    const string2 = string1.replace('{{data}}',data)
    response.write(string2)
    response.end()
}
```

在接收数据的网站，创建一个script标签，把对方共享的数据地址写到script标签

然后把script标签加到body，打印出来，就获取到对方要共享的数据了
```js
const script = document.createElement('script')
script.src = 'http://127.0.0.1:8888/friends.js'
script.onload = () => {
    console.log(window.xxx)
}
document.body.appendChild(script)
```


到这里就完成了JSONP的基本应用

但是现在还有些问题，比如这样写的话，所有网站都可以获取到你要定向共享的数据

这样就没有意义了，所以我们需要定向共享的话，就需要做一个 referer 检查

假如访问方的地址不为：http://127.0.0.1:8889 ，就返回404。

如果是 http://127.0.0.1:8889 ，就返回共享的数据

这样可以做到定向访问数据，但是如果对方网站被攻陷，那么我们的共享数据也会被偷走

安全的上限是取决于该安全链条上最薄弱的一环。

所以后面需要添加更多的验证来提高安全水平。
```js
if(request.headers['referer'].indexOf('http://127.0.0.1:8889')){ 
        const string1 = fs.readFileSync('./public/friends.js').toString();
        const data = fs.readFileSync('./public/friends.json').toString();
        const string2 = string1.replace('{{data}}',data)
        response.write(string2)
        response.end()
    }else{
        response.statusCode = 404;
        response.end();
    }
    
```



