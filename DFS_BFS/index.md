# 深度优先遍历 and 广度优先遍历
> 遍历在前端的应用场景不多，多数是处理`DOM`节点数或者 深拷贝。下面笔者以深拷贝为例，简单说明一些这两种遍历。

## 深度优先遍历
> 想象有一颗节点树，从某个顶点开始，一直往下遍历，直到遍历到的节点都访问过后，往回走，遍历没有访问的节点，感觉很像递归。下面笔者就用递归实现 深度优先遍历。

```js

function DFS(target,visiteds){
    var Type = Object.prototype.toString.call(target).slice(8,-1);
    console.log(Type)
    var copy = Type == 'Array'?[]:{};
    visiteds = visiteds|| []; //处理环形数据，防止无限循环
    switch(Type){
        case 'Array':
        case 'Object':
            var index = visiteds.indexOf(target);
            if(index>-1){
                copy = visiteds[index];
            }else{
                visiteds.push(target);
                for(var key in target){
                    copy[key] = DFS(target[key],visiteds);
                }
            }
        break;
        default:
            copy = target;
        break; 

    }
    return copy;
};

```

## 广度优先遍历

>如果把`深度优先遍`历看成纵向遍历，那么`广度优先遍历`就是横向遍历，一层一层的往下遍历。下面用队列(FIFO)来实现。

```js

function getEmpty(o){
	if(Object.prototype.toString.call(o) === '[object Object]'){
		return {};
	}
	if(Object.prototype.toString.call(o) === '[object Array]'){
		return [];
	}
	return o;
}

function BFS(target){
	var queue = [];
	var targetMap = []; //处理环形数据，防止无限循环
	var copy = getEmpty(target);
	if(copy!==target){
		queue.push([target,copy]);
	}
	while(queue.length>0){
		var [_target,_copy] = queue.shift();  //*
		for(var key in _target){
			var index = targetMap.indexOf(_target[key]);
			if(index>-1){
				_copy[key] = targetMap[index]
				continue;
			}
			_copy[key] = getEmpty(_target[key])
			if(_copy[key]!==_target[key]){
				queue.push([_target[key],_copy[key]]); //*
				targetMap.push(_target[key]);
			}
		}
	}
	return copy
}

```

## 总结
> 上面用两种不同的方法实现了深拷贝，但是只针对Object,Array的情况，其他的复杂对象没有考虑到，当然你也可以添加更多的处理，但笔者认为目前这样已经足够用了。。。
> 深度优先遍历，关键在于理解递归，而广度优先遍历，关键在于理解，`queue.shift`出去的数据保存着原来数据的引用，所以才能够在不断的进栈出栈中修改值(间接修改值)