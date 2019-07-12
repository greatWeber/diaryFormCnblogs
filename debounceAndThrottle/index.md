# 防抖和节流
> 这个也是面试的时候经常考的哦！笔者现在简单的说一下(是真的简单说一下)。。。

## 防抖
> 防抖: 触发一个事件，会把它延迟到n秒后执行。至于为什么叫防抖，本人不清楚。。。[查看例子](https://greatweber.github.io/diaryFormCnblogs/debounceAndThrottle/debounce.html)

```js

function debounce(fn,time){
    var timer = null;
    return function(){
        clearTimeout(timer); //重点，要不断清除上次的定时器
        timer = setTimeout(()=>{
            console.log('防抖')
            fn.apply(this,arguments)
        },time);
    }
}

```

## 节流
> 节流: 触发一个事件，它只会在n秒内执行一次。[查看例子](https://greatweber.github.io/diaryFormCnblogs/debounceAndThrottle/throttle.html)

```js

function throttle(fn,time){
    var bool = true;
    return function(){
        if(!bool) return;
        bool = !bool;
        fn.apply(this,arguments);
        console.log('节流');
        setTimeout(function(){
            bool = !bool;
        },time);
    }
}

```

## 总结
> 防抖和节流虽然在实现上不同，但都可以减少高频事件的次数，达到一种优化的效果。
如果你想更多的了解或者参与讨论，请看[这里](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/5)