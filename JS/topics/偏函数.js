/** 偏函数 (Partial application) 的定义为:
 *  局部应用是指固定一个函数的一些参数，然后产生另一个更小元的函数。
 *  什么是元？元是指函数参数的个数，比如一个带有两个参数的函数被称为二元函数。
 */

 /** 第一版 */
function partial(fn) {
  var args = [].slice.call(arguments, 1);
  console.log(args);
  return function() {
    var newArgs = args.concat([].slice.call(arguments));
    console.log(newArgs);
    return fn.apply(this, newArgs);
  }
}

 // 验证
function add(a, b) {
  return a + b + this.value;
}

var addOne = partial(add, 1);

var value = 2;
var obj = {
  value: 3,
  addOne: addOne
}

obj.addOne(5);

/** 第二版：占位符 */
var _ = {};
function partial1(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
    // var newArgs = args.concat([].slice.call(arguments));
    var position = 0, len = args.length;
    for (var i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i]
    }
    while(position < arguments.length)
    args.push(arguments[position++]);
    return fn.apply(this, args);
  }
}

// 验证
var substract = function(a, b) {
  return (b - a);
};
subform20 = partial1(substract, _, _);

console.log(subform20(5, 3));



