# 小程序云开发小记

> 现在云开发是越来越火了，刚好最近在做一个小程序云开发的项目，就记录一下心得和遇到的问题！

## 小程序云开发与普通的开发有什么区别？
> 最大的区别就是把数据库搬到了云上，而且可以让前端直接操作数据库，让前端开发者某种意义上成为了全栈工程师！
> 云开发新增了两个关键的知识点：`云函数` 和 `云数据库操作`。

## 云函数
> 云函数, 顾名思义：就是放到腾讯云的函数，然后小程序可以通过`wx.cloud.callFunction`的方法调用，非小程序端，也可以通过`http`请求调用云函数。
> 云函数的开发流程一般如下: 小程序本地编写函数 -> 本地调试 -> 点击上传函数。具体细节官方介绍得很清楚，可以[看这里](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/quickstart.html);

### 云函数 tip
> 一般来说，一个文件夹对应一个云函数； 当然你也可以一个文件夹写多个函数，每个函数export一个函数名，然后在index.js中通过不同的请求参数名来调用不同的函数。
```js
//  一个文件夹对应多个函数的情况
//  test.js
module.exports = async (event, context)=> {
    console.log('this is test.js');
}

//  index.js
const test = require('./test.js');
const controller = {test};

const cloud = require("wx-server-sdk");
cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
});
exports.main = async (event, context) => {
  const { action } = event;
  try {
    return (await controller[action](event, context))
  } catch (err) {
    console.log(err);
    return err;
  }
};

//  小程序端调用
wx.cloud.callFunction({
    name:'xxx', // 这里写云函数的文件夹名称
    data:{
        action:'test',
        paramt:'xxx', // 其他自定义参数
    }
})

```

> 云函数所在的文件夹是可以安装`npm`，一般来说云函数都会依赖`wx-server-sdk`这个库，所以本地要安装依赖。
> 如果依赖没有安装，那么本地调试是用不了的。但是我们上传云函数的时候，是可以不上传这些依赖的！

### 云函数 定时
> 云函数是可以定时的，需要在云函数的根目录添加一个定时触发器的配置,新建一个`config.json`, 格式内容如下：
```js
{
  // triggers 字段是触发器数组，目前仅支持一个触发器，即数组只能填写一个，不可添加多个
  "triggers": [
    {
      // name: 触发器的名字，规则见下方说明
      "name": "myTrigger",
      // type: 触发器类型，目前仅支持 timer (即 定时触发器)
      "type": "timer",
      // config: 触发器配置，在定时触发器下，config 格式为 cron 表达式，规则见下方说明
      "config": "0 0 2 1 * * *"
    }
  ]
}

```
> 注意： 云函数触发器要在小程序端点击右键选择`上传触发器`,如果只是选择上传云函数，是没有效果的; 另外要注意的是config的`cron`格式；格式如果不对，定时的时间可能不会达到预期的效果。[具体看这里](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/triggers.html)

### 善于利用console和日志查看云函数bug
> 虽然云函数可以本地调试，但不能保证到了云环境中不会报错。这个时候就可以在云开发控制台中的日志查看，可以在关键的地方用console打印调试的信息。

### 什么地方使用云函数
> 使用云函数的好处是不用审核就能直接更新，不像小程序更新还要等待审核。以下的几种情况都可以用云函数:
1. 对数据库的写入操作，应该用云函数来解决;
2. 数据库的读取，可以用云函数，也可以在小程序本地，看情况;
3. 复杂的逻辑关系操作，应该放在云函数中，比如：登录；购物车；下单等操作;
4. 第三方的接口对接，也可以写在云函数中;

## 云数据库
> 关于数据库，腾讯有自己的一套sdk使用，用很多的语句和方法可以用，对于数据库不熟练的前端来说，确实有些压力，需要花多点时间学习，也可以请教认识的后台同事。这里我直接贴上地址，你们慢慢学习[传送门](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/init.html)

### 值得注意的地方
> 云数据库在小程序和云函数上的操作方式都是一样的，但有个地方需要注意的：在初始化数据库的时候，最好指定云环境的id，一般来说我们都是会建立两个不同的云环境的，一个测试，一个正式，但在切换的时候，如果数据库没有指定相应的环境，是会默认读取第一个环境的！！！
> 还有一个坑，有的人认为在初始化云的时候指定环境 就可以了，其实不完全正确，具体来说，这样只会切换对应的云函数和数据库的读操作，如果涉及数据库的写操作，还是要再指定一下对应的云环境。。。
```js
//  小程序的指定云环境
// 1. 在app.onLaunch 的时候初始化
wx.init.cloud({
    env: process.env.NODE_ENV === "development"? "测试环境id":"正式环境id"
});

const db = wx.cloud.database({
    env: process.env.NODE_ENV === "development"? "测试环境id":"正式环境id"
});

//  云函数中指定云环境
const cloud = require('wx-server-sdk');
cloud.init({
	env:cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
});

```
