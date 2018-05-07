/** call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。 */

/** 1. call 改变了this指向，2. 且函数执行了。 */

/** 模拟步骤： 1. 将函数设为对象的属性。 2. 执行该函数。 3.删除该函数。 
 *  // 第一步
    foo.fn = bar
    // 第二步
    foo.fn()
    // 第三步
    delete foo.fn
    fn 是对象的属性名，反正最后也要删除它，所以起成什么都无所谓。
*/

/** 第一个版本 */

Function.prototype.call2 = function(context) {
  // 首先要获取调用call的函数，用this可以获取
  // context 就是要作用到的对象
  context.fn = this;
  context.fn();
  delete context.fn;
}
var foo = {
  value: 1
};
function bar() {
  console.log(this.value);
}
bar.call2(foo);

/** 第二个版本：处理不定参数 */
/** 我们可以从 Arguments 对象中取值，取出第二个到最后一个参数，然后放到一个数组里。 */
/** 用 eval 方法拼成一个函数，这里 args 会自动调用 Array.toString() 这个方法。 */

Function.prototype.call3 = function(context) {
  context.fn = this;
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push(`arguments[${i}]`);
  }
  console.log(args);
  console.log(eval(`${args[0]}`));
  console.log(eval(`${args[1]}`));
  eval(`context.fn(${args})`);
  delete context.fn;
}

var foo3 = {
  value: 2
};
function bar3(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}
bar3.call3(foo3, 'Jane', 18);

/** 模拟代码已经完成 80%，还有两个小点要注意：
 *  1. this 参数可以传 null，当为 null 的时候，视为指向 window;
 *  2. 函数是可以有返回值的！
 */

Function.prototype.call5 = function(context) {
  var context = context || window;
  context.fn = this;
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push(`arguments[${i}]`);
  }
  var result = eval(`context.fn(${args})`);
  delete context.fn;
  return result;
}

function bar5(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name,
    age
  };
}

console.log(bar5.call5(foo3, 'Jane2', 20));

/** apply 模拟实现 */
Function.prototype.apply1 = function(context, arr) {
  var context = Object(context) || window;
  context.fn = this;
  var result;
  if (!arr) result = context.fn();
  else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push(`arr[${i}]`);
    }
    console.log(eval(`${args}`))
    result = eval(`context.fn(${args})`);
  }
  delete context.fn;
  return result;
}

console.log(bar5.apply1(foo3, ['Jane3', 20]))
