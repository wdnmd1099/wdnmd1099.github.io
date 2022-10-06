# 异步任务完成有两种状态，成功完成或失败完成。
## 如何判断异步任务是成功完成还是失败完成？

用回调可以解决：

方法一：回调接受两个参数

可以写一个fs.readFile读1.txt，然后写一个回调函数，它会在读完文件后调用这个回调函数，这个回调函数要接受两个参数，一个失败一个成功，然后判断是否失败，失败就return，成功就打印出1.txt的内容
```js
    fs.readFile('./1.txt',(error,data)=>{
        if(error){  console.log('失败');return }
        console.log(data.toString()) //成功
    })
```
方法二：写两个回调

```js
    ajax('get','/1.json', (data)=>{},error=>{})  // 箭头函数可以不写括号，error=>{} === (error)=>{}
 //data是成功回调，后面的error是失败回调

    ajax('get','/1.json',{
        success: ()=>{} , fail: ()=>{}
    })//接受一个对象，对象有的两个key表示成功和失败
    //回调也可以是对象的形式。
```





为什么要用promise
1. 如上面的代码写的名称不够规范，五花八门，有人用success + error ，有人用success + fail，有人用done + fail 等等
2. 容易出现回调地狱，使代码可读性降低
3. 很难进行错误处理

### 回调地狱图示
![回调地狱](/posts/2022/6/2/回调地狱.png)


### 有什么办法能解决这三个问题
```
1. 规范回调的名字或顺序

2. 拒绝回调地狱，让代码可读性更强

3. 很方便地捕获错误
```

1976 年，Daniel P. Friedman 和 David Wise
俩人提出 Promise 思想


后人基于此发明了 Future、Delay、Deferred 等
前端结合 Promise 和 JS，制订了 [Promise/A+](https://www.ituring.com.cn/article/66566) 规范

--------------------------

## 以AJAX的封装为例解释Promise的用法

```js
ajax = (method, url, options)=>{
  const {success, fail} = options // 析构赋值
  //等于从options拿出success，fail两个属性，后面可以直接用
  //等于 const success = options.success ，fail同理 
  const request = new XMLHttpRequest() //ajax四部曲
  request.open(method, url)
  request.onreadystatechange = ()=>{
    if(request.readyState === 4){
      // 成功就调用 success，失败就调用 fail
      if(request.status < 400){ //简写成状态码小于400为成功
        success.call(null, request.response)
      }else if(request.status >= 400){
        fail.call(null, request, request.status)
      }
    }
  }
  request.send()
}


//上面的ajax代码封装完成，调用传两个函数，一个success，一个fail，哪个符合就run哪个
ajax('get', '/xxx', { 
  success(response){}, fail: (request, status)=>{} 
}) // 左边是 function 缩写，右边是箭头函数，在对象里写函数就可以这样写。

```

## 改成用Promise的写法

```js
// 先改一下调用的姿势
ajax('get', '/xxx', { 
  success(response){}, fail: (request, status)=>{} 
})
// 上面用到了两个回调，还使用了 success 和 fail

// 改成 Promise 调用的写法
ajax('get', '/xxx')
.then((response)=>{}, (request)=>{})
  

// 虽然也是回调
// 但是不需要记 success 和 fail 了
// then 的第一个参数就相当于 success
// then 的第二个参数就相当于 fail

// 请问 ajax() 返回了什么？
// 返回了一个含有 .then() 方法的对象
// 那么再请问如何得到这个含有 .then() 的对象呢？
// 那就要改造 ajax 的源码了
```
如下：

```js
ajax = (method, url, options)=>{

  return new Promise((resolve, reject)=>{
      //先返回一个Promise构造的对象，这个对象接受一个函数，函数的内容依然是AJAX的四部曲，
      //只是成功与失败的判断部分改成了resolve 和 reject ，
      //这两个名称是约定俗成的，因为它返回的是Promise的对象，
      //所以可以使用链式操作用then((resolve)=>{},(reject)=>{})把两个成功失败函数传进去使用。
    
    const {success, fail} = options
    const request = new XMLHttpRequest()
    request.open(method, url)
    request.onreadystatechange = ()=>{
      if(request.readyState === 4){
        // 成功就调用 resolve，失败就调用 reject
        if(request.status < 400){
          resolve.call(null, request.response).
        }else if(request.status >= 400){
          reject.call(null, request)
        }
      }
    }
    request.send()
  })
}

```

## 关键点就在于：  return new Promise((resolve, reject)=>{}
-----------
### 小结：如何让回调的异步函数变成Promise的异步函数

```
第一步
return new Promise((resolve,reject)=>{...})

任务成功则调用 resolve(result) 
任务失败则调用 reject(error)
要注意：resolve 和 reject 都只接受一个参数，这是API决定的。

resolve 和 reject 会再去调用成功和失败函数

第二步
使用 .then(成功函数, 失败函数) 传入成功和失败函数
```


# 问题：封装的ajax有缺点
```
post 无法上传数据
request.send(这里可以上传数据)

不能设置请求头
request.setRequestHeader(key, value)

怎么解决呢？
花时间把 ajax 写到完美
或
使用 jQuery.ajax
或
使用 axios(推荐)
```


# [jQuery.ajax()](https://www.jquery123.com/jQuery.ajax/)


# [Axios](https://juejin.cn/post/6844903569745788941)
