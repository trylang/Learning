/** 一句话介绍bind： bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN ) */

/** bind函数的两个特点： 1. 返回一个函数； 2. 可以传入参数； */

/** 第一个版本：返回函数的模拟实现 */
Function.prototype.bind1 = function(context) {
  var self = this;
  return function() {
    return self.apply(context);
  }
} 

/** 此外，之所以 return self.apply(context)，是考虑到绑定函数可能是有返回值的，依然是这个例子： */
var foo = {
  value: 1
};

function bar() {
  console.log(this.value);
}
var bindFoo = bar.bind1(foo);
console.log(bindFoo());

/** 传参的模拟实现 */
/** 函数需要传 name 和 age 两个参数，竟然还可以在 bind 的时候，只传一个 name，在执行返回的函数的时候，再传另一个参数 age!
    这可咋办？不急，我们用 arguments 进行处理： */

/** 第二版 */
Function.prototype.bind2 = function(context) {
  var self = this;
  // 获取bind2函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);
  console.log(args);
  return function() {
    // 这个时候的arguments是指bind返回的函数传入的参数
    var bindArgs = Array.prototype.slice.call(arguments);
    console.log(bindArgs);
    return self.apply(context, args.concat(bindArgs));
  }
}

var foo2 = {
  value: 2
};
function bar2(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

var bindFoo2 = bar2.bind2(foo2, 'daisy');
bindFoo2(23);









