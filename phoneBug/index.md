# 移动端遇到的bug

## border-radius和transform在一起的bug
> 当父级设置了`border-radius+overflow:hidden`的时候，圆角是可以包住子级的，这是个很常见的场景。
但是当子级设置了`transform`属性后，bug就发生了。
> 准确来说是在移动端才会发生bug, pc端是正常的，具体的表现是: 父级的圆角无法包住 运动中的子级。
> 解决方法也很简单，就是在父级添加`transform:rotate(0deg)`属性。[手机查看例子]()
> 至于为什么出现这种问题，以及解决bug的原理，本人暂时无法解答。