# 如何用for..of.. 遍历一个普通的对象？
> 首先了解一下for..of..: 它是es6新增的一个遍历方法，但只限于迭代器(iterator), 所以普通的对象用for..of遍历
是会报错的。下面来说明一下如何用for..of..遍历普通对象

## 类数组对象
> 如果对象是一个类数组对象，那好办，用`Array.from`转成数组即可。
```js
var obj = {
    0:'one',
    1:'two',
    length: 2
};
obj = Array.from(obj);
for(var k of obj){
    console.log(k)
}
```

## 非类数组对象
> 如果不是类数组对象，也有办法，添加一个[Symbol.iterator]属性，并指向一个迭代器即可。
```js
//方法一：
var obj = {
    a:1,
    b:2,
    c:3
};

obj[Symbol.iterator] = function(){
	var keys = Object.keys(this);
	var count = 0;
	return {
		next(){
			if(count<keys.length){
				return {value: obj[keys[count++]],done:false};
			}else{
				return {value:undefined,done:true};
			}
		}
	}
};

for(var k of obj){
	console.log(k);
}

```
```js
// 方法二
var obj = {
    a:1,
    b:2,
    c:3
};
obj[Symbol.iterator] = function*(){
    var keys = Object.keys(obj);
    for(var k of keys){
        yield [k,obj[k]]
    }
};

for(var [k,v] of obj){
    console.log(k,v);
}

```

## 总结
> 好了，到这里本文就结束了，你get到要点了吗，如果觉得文章还可以，就点个关注，收藏，推荐(素质三连)吧