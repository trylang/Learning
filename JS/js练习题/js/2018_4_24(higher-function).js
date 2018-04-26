
/** https://juejin.im/post/5ad6b34a6fb9a028cc61bfb3  高阶函数 */
/** 1. 函数可以作为参数传递； 2. 函数可以作为返回值输出 */

/** 下面实现的isType函数，属于偏函数的范畴，偏函数实际上是返回了一个包含预处理参数的新函数，以便之后可以调用 */
function isType(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  }
}
const isArray = isType('Array');
console.log(isArray([1,2, [3,5]])); // true


/** 预置函数：它的实现原理也很简单，当达到条件时再执行回调函数。
 *  这种预置函数也是js中巧妙的装饰者模式的实现，装饰者模式在实际开发中也非常有用， */
function after(time, cb) {
  return function() {
    if (--time === 0) {
      cb();
    }
  }
}
// 举个栗子吧，吃饭的时候，我很能吃，吃了三碗才能吃饱
let eat = after(3, function() {
  console.log('吃饱了');
});
eat();
eat();
eat();
// 上面的eat函数只有执行3次的时候才会输出'吃饱了'，还是比较形象的。


/** 再来创建一个单例模式 */
let single = function(fn) {
  let ret;
  return function() {
    console.log(ret);
    // 所以之后每次都会执行ret，就不会再次绑定了
    return ret || (ret = fn.apply(this, arguments));
  }
};

let bindEvent = single(function() {
  // 虽然下面的renders函数执行3次，bindEvent也执行了3次
  // 但是根据单例模式的特点，函数在被第一次调用后，之后就不再调用了
  let a = 0;
  return `就是我呀${a++}`;
});

let renders = function() {
  console.log('渲染');
  bindEvent();
}

// renders();
// renders();
// renders();

// 这个高阶函数的栗子，可以说一石二鸟啊，既把函数当做参数传递了，又把函数当返回值输出了。 单例模式也是一种非常实用的设计模式。

/** 高阶得其他应用 */

/** 1. 函数柯里化：在一个函数中填充几个参数，然后再返回一个新函数，最后进行求值。 */
/** 柯里化又称部分求值，柯里化函数会接收一些参数，然后不会立即求值，而是继续返回一个新函数，将传入的参数通过闭包的形式保存，等到被真正求值的时候，再一次性把所有传入的参数进行求值 */

// 简单实现柯里化函数：接收参数，返回新函数，把参数传给新函数使用，最后求值
let add = function(x) {
  return function(y) {
    return x + y;
  }
}
add(3)(4); // 7


// 写一个通用得柯里化函数
function curry(fn) {
  let slice = Array.prototype.slice, // 将slice缓存起来
      args = slice.call(arguments, 1); // 这里将arguments转成数组并保存 
  
  return function() {
    // 将新旧的参数拼接起来
    let newArgs = args.concat(slice.call(arguments));
    return fn.apply(null, newArgs);  // 返回执行的fn并传递最新的参数
  }
}

const foo = curry(function(a, b, c, d) {
  console.log(a, b, c, d);
});

// foo(1,2,3,5);


/** 利用es6再实现一下 */
function curry_es6(fn) {

  // const g = (...allArgs) => allArgs.length >= fn.length 
  //         ? fn(...allArgs) 
  //         : (...args) => g(...allArgs, ...args);
  
  const g = (...allArgs) => {
    if (allArgs.length >= fn.length) {
      return fn(...allArgs)
    } else {
      return (...args) => {
        return g(...allArgs, ...args)
      }
    }
  }
  
  return g; 

}

// 测试用例
const foo_es6 = curry_es6((a, b, c, d) => {
  console.log(a, b, c, d);
});

foo_es6(1)(2)(3)(4); 
const f = foo_es6(1)(2)(3);
f(5);


/** 函数节流 */
function throttle(fn, wait) {
  let _fn = fn, // 保存需要被延迟的函数引用
  timer,
  flags = true; // 是否首次调用

  return function() {
    let args = arguments,
    self = this;

    if (flags) { // 如果是第一次调用不用延迟，直接执行即可
      _fn.apply(self, args);
      flags = false;
      return false;
    }

    // 如果定时器还在，说明上一次还没有执行完，不往下执行
    if (timer) return false;
    timer = setTimeout(function() { // 延迟执行
      clearTimeout(timer); // 清空上次的定时器
      timer = null;  // 销毁变量
      _fn.apply(self, args);
    }, wait);
  }

};

window.onresize = throttle(function() {
  console.log('滚动');
}, 500);


/** 分时函数：我们如果一次获得了很多数据(比如有10W数据)，然后在前端渲染的时候会卡到爆。所以在处理这么多数据的时候，我们可以选择分批进行。 */
function timeChunk(data, fn, count = 1, wait) {
  let obj, timer;

  function start() {
    let len = Math.min(count, data.length);
    for (let i = 0; i < len; i++) {
      // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
      val = data.shift(); // 每次取出一个数据，传给fn当作值来做
      fn(val);
    }
  }

  return function() {
    timer = setInterval(function() {
      if (data.length === 0) { // 如果数据为空了，就清空定时器
        return clearInterval(timer);
      }
      start();
    }, wait); // 分批执行的时间间隔
  }

}

// 测试用例
let arr = [];
for (let i = 0; i < 100; i++) { // 这里跑10万数据
  arr.push(i);
}

let render = timeChunk(arr, function(n) { // n为data.shift()取到的数据
  let div = document.createElement('div');
  div.innerHTML = n;
  document.body.appendChild(div);
}, 8, 500);

render();
