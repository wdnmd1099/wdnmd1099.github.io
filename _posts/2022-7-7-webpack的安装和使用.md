# webpack 的安装
```js
全局安装
npm install -g webpack@4 webpack-cli@3
或
yarn global add webpack@4 webpack-cli@3



查询webpack的下载版本
npm info webpack



webpack 本地安装（安装在项目目录里）
 yarn add webpack webpack-cli --dev
 或
 npm install webpack webpack-cli --dev




调用本地安装的webpack
 ./node_modules/.bin/webpack --version
或
npx webpack （这种有几率出现bug，如果这个不能用就用上面这种手动调用的方式）



这样运行之后会有一个警告（大概长这样）
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/con
figuration/mode/
```
需要新建一个文件webpack.config.js
先去网站看看有没有变化：
[https://www.webpackjs.com/concepts/configuration/](https://www.webpackjs.com/concepts/configuration/)

```js
里面写：

var path = require('path');

module.exports = {
    mode: 'development',//开发模式development，发布模式production
    entry: './你的入口js文件',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js' //给一个随机值当文件名，
        //当你改变内容的时候就会更新这个文件名，不改变内容则不变
        //好处是当你不变的话，浏览器从缓存里读取文件，访问超快，变了的话及时从服务器下载新的。
    }
};



像上面这样写会有问题就是dist 文件会越来越多
所以每次运行webpack之前要删除dist文件

去package.json 在"script":{}里加上 "build":"rm -rf dist && webpack",
就是这样：
  "scripts": {
    "build":"rm -rf dist && webpack",
    ............
  },

写完之后运行 yarn build 就可以先删除再webpack了
```


# webpack插件生成HTML
```


```





