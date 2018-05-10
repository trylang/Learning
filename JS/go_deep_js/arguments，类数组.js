/** 类数组对象：拥有一个 length 属性和若干索引属性的对象。 */

/** 在函数体中，arguments 指代该函数的 Arguments 对象。 */
/** Arguments 对象的 callee 属性，通过它可以调用函数自身。 */

// 讲个闭包经典面试题
var data = [];
var func1 = function() {};
for (var i = 0; i < 3; i++) {
  // (data[i] = function() {
  //   console.log(arguments.callee.i);
  // }).i = i;  
  (func1).i = i;
  console.log((func1).i)

}
console.log('func',func1);
console.log(func1[1]);
console.log(func1[2]);
console.log(data);
// data[0]();
// data[1]();
// data[2]();

/** arguments 和对应参数的绑定 */
/** 1. 传入的参数，实参和arguments的值会共享，当没有传入时，实参与arguments值不会共享；
 *  2. 除此之外，以上是在非严格模式下，如果是在严格模式下，实参和arguments是不会共享的。
 */
function foo(name, age, sex, hobbit) {
  "use strict";
  console.log(name, arguments[0]);

  // 改变形参
  name = 'new name';
  console.log(name, arguments[0]);

  // 改变arguments
  arguments[1] = 'new age';
  console.log(age, arguments[1]);

  // 测试未传入的是否会绑定
  console.log(sex); 
  sex = 'new sex';
  console.log(sex, arguments[2]);

  arguments[3] = 'new hobbit';
  console.log(hobbit, arguments[3]); 
}

foo('name', 'age');


/** 传递参数：将参数从一个函数传递到另一个函数。 */
// 使用apply将foo1的参数传递给bar
function foo1() {
  console.log(this);
  console.log(arguments);
  bar.apply(this, arguments);
}

function bar (a, b, c) {
  console.log(a, b, c);
}
foo1(1,2,3);

// 强大的ES6， 可以使用...运算符，轻松将类数组转成数组。
function func(...args) {
  console.log(args);
}

func(5,6,7);

/** arguments的长度只与实参的个数有关，与形参定义的个数没有直接关系。
 *  arguments有一个Symbol（Symbol.iterator）属性表示这个对象是可迭代的。
 */