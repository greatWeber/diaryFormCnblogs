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
