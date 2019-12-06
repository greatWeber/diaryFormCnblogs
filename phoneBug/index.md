# 移动端遇到的bug

## border-radius和transform在一起的bug
> 当父级设置了`border-radius+overflow:hidden`的时候，圆角是可以包住子级的，这是个很常见的场景。
但是当子级设置了`transform`属性后，bug就发生了。
> 准确来说是在移动端才会发生bug, pc端是正常的，具体的表现是: 父级的圆角无法包住 运动中的子级。
> 解决方法也很简单，就是在父级添加`transform:rotate(0deg)`属性。[手机查看例子](https://greatweber.github.io/diaryFormCnblogs/phoneBug/border-radius.html)
> 至于为什么出现这种问题，以及解决bug的原理，本人暂时无法解答。

## 表单退出键盘在ios微信端的bug
> 具体bug: 在ios微信端，当在输入框唤起键盘后，页面会抬升，输入完成键盘退出后，页面并没有自动恢复到原来的样子, 越接近页面底部越明显。
> 解决方法是使用`document.documentElement.scrollIntoView(false)`,让页面自动回滚。[手机查看例子](https://greatweber.github.io/diaryFormCnblogs/phoneBug/form.html)

```js
;(/iphone|ipod|ipad/i.test(navigator.appVersion) && navigator.userAgent.indexOf('MicroMessenger') >= 0) && (function () {
    var Timer = null;
    document.addEventListener('blur', function (e) {
    // 这里加了个类型判断，因为a等元素也会触发blur事件
    if (e.target && e.target.localName) {
        ['input', 'textarea'].indexOf(e.target.localName) !== -1 && document.documentElement.scrollIntoView(false)
    }
    }, true);
})();

```

## 移动端弹窗滚动穿透的bug
> 具体bug: 当在弹窗上滚动的时候，下面的页面也会触发滚动。
> 解决方法：请看笔者的另外一篇文章! [传送门](https://www.cnblogs.com/blogs-xlf/p/11102939.html)

## 移动端1px问题
> 这里我用了5中方法解决，想要查看效果，用手机查看这里[传送门](https://greatweber.github.io/diaryFormCnblogs/phoneBug/1px.html)
> 这五种方法的代码如下：
```css
.border-type_1 {
    border-bottom: 0.01rem solid #000;
}

.border-type_2 {
    border-bottom: 1px solid #000;
}

.border-type_3 {
    border-bottom: 0.5px solid #000;
}
.border-type_5 {
    position: relative;
}

.border-type_5::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
    background: #000;
}

.border-type_6 {
    box-shadow: inset 0px -1px 1px -1px #000;
}
```
> 这五种方法中，比较稳的是`使用伪类`, 使用`rem, 0.5px` 在ios上是没有问题，但在安卓上就尴尬了，微信浏览器和大多数浏览器都不支持，新版的chrome则没问题。而`使用阴影`也是很稳，但颜色很难控制。

