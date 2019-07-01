# js实现小数点四舍五入

> 其实这个问题，在之前的面试中被提问到了，由于笔者平时都是用原生的`toFixed()`的方法来保留小数点，所以当时并没有回答出来这个问题，呜呜呜~.~
> 现在突然想起了这个问题，就研究一下吧。

## 最简单的实现方法

> 可以使用`Math`对象的一些方法来实现，这个比较简单，主要用到了`Math.round`和一些简单的乘除法运算。[例子](https://greatweber.github.io/diaryFormCnblogs/roundingDecimalPoints/example1.html)
 思路：
    1. 先把数值转成`只有一位小数点`的数值
    2. 利用`Math.round`方法四舍五入(关键)
    3. 最后通过乘除法运算等到想要的小数点位数

```js

function toFixed(num,decimal){
    if(isNaN(num)){
        return 0;
    }
    num = num-0;
    var p1 = Math.pow(10, decimal + 1);
    var p2 = Math.pow(10, decimal);
    console.log(num * p1 / 10);
    console.log(Math.round(num * p1 / 10));
    return (Math.round(num * p1 / 10) / p2).toFixed(decimal); //思考一下，为什么要除10？
}

```
> 运行一下上面的代码，其实有隐藏的bug...

```js

toFixed(2.555,2) //2.56

toFixed(4100.065,2) //4100.06 ？？？

console.log(4100065/10) //410006.49999999994  这就是bug的答案

0.1+0.2=? //0.30000000000000004
```

> 所谓的隐藏bug，就是js编程语言的小数点精度问题，所以上面那个除于10 只是在一定的范围内有效，过了这个范围，还是会出现精度问题...

## 用字符串处理

> 既然小数点进行运算会出现问题，那我们换一种思路，用字符串来处理。[例子](https://greatweber.github.io/diaryFormCnblogs/roundingDecimalPoints/example2.html) :simple_smile:
思路：
    1. 把数字转成字符串，然后把小数点移动到倒数第二位。(模拟只有一位小数点)
    2. 还是用到`Math.round`来四舍五入
    3. 重复第一个步骤，不过把小数点移动到(你要保留多少位小数点)

```js

function toFixed(num,decimal){
    if(isNaN(num)){
        return 0;
    }
    var strnum = num+'';
    var arr = strnum.split('.');
    if(arr.length<2){
        return num.toFixed(decimal);
    }

    strnum = arr.join('');

    var strnum2 = strnum.slice(0,-1)+'.'+strnum.slice(-1);

    var result = Math.round(strnum2-0)+'';

    return result.slice(0,-decimal)+'.'+result.slice(-decimal)
}

```

