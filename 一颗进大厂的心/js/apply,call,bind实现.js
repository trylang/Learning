// call, apply 改变this并立即执行，bind改变this，但不会立即执行

let a = {
  value: 1
}

function getValue(name, age) {
  this.habit = 'shopping';
  console.log(123, this);
  console.log(name, age);
  console.log(this.value);
  return 'shiwo'
}
getValue.prototype.friend = 'kevin';

Function.prototype.call = function (args) {  // args 其实代表的就是第一个参数； arguments才是代表多个参数伪数组 
  console.log(2121, context);
  var context = [...arguments].shift() || window;
  context.fn = this; // 函数
  var args = [...arguments].slice(1); // 参数
  var result = context.fn(...args);
  delete context.fn;
  return result;
}
// console.log(getValue.call(a, 'jack', 18))


Function.prototype.apply = function (context) {  // args 其实代表的就是第一个参数； arguments才是代表多个参数伪数组 
  var context = context || window;
  context.fn = this; // 函数
  // var args = [...arguments].slice(1); // slice返回数组 参数 [['jack12', 23]]
  // console.log(args);
  var result = context.fn(...arguments[1]);
  delete context.fn;
  return result;
}
// console.log(getValue.apply(a, ['jack12', 23]))


// bind 
Function.prototype.bind = function (context) {  // args 其实代表的就是第一个参数； arguments才是代表多个参数伪数组 
  // 作用域
  var context = context || window;
  // 函数 this
  var _this = this;
  // 参数
  var args = [...arguments].slice(1); // bind 时候带的参数

  // 返回函数
  return function F (...params) { // 调用函数时传得参数, ...解构就是所有参数
    // 两个参数拼接合成最后函数调用得参数
    var params = args.concat(params);
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...params)
    }
    return _this.apply(context, params);
  }
}
let haha = getValue.bind(a, 'Jane');
var newHaha = new haha('18')
console.log(newHaha.friend);
console.log(newHaha.habit);