/**
 * @description 0. 原型链继承
 */
function Parent0() {
  this.name = 'kevin';
}
Parent0.prototype.getName = function() {
  console.log(this.name);
}

function Child0() {};
Child0.prototype = new Parent0();

var child0 = new Child0();
child0.getName();

// 问题: 1. 引用类型的属性被所有实例共享，举个例子
function Parent01() {
  this.names = ['kevin', 'daisy'];
}

function Child01() {}

Child01.prototype = new Parent01();

var child01 = new Child01();
child01.names.push('yayu');
console.log('child01.names',child01.names);

var child010 = new Child01();
console.log('child010.names', child010.names);

// 问题：2.在创建Child的实例时，不能向Parent传参

/**
 * @description 1. 借用构造函数（经典继承）
 * 优点： 1. 避免了引用类型的属性被所有实例共享
 *       2. 可以在Child种向Parent传参
 * 缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法
 */
function Parent1() {
  this.names = ['kevin', 'daisy'];
}

function Child1() {
  Parent1.call(this);
}

var child1 = new Child1();
child1.names.push('yayu');
console.log('child1.names', child1.names);

var child10 = new Child1();
console.log('child10.names', child10.names);

/** 举个可传参的例子 */
function Parent10(name) {
  this.name = name;
}

function Child10(name) {
  Parent10.call(this, name);
}

var child10 = new Child10('kevin');
console.log(child10.name);

var child101 = new Child10('daisy');
console.log(child101.name);

/**
 * @description 2. 组合继承： 原型链继承和经典继承双剑合璧
 * @param {any} name 
 * 优点：融合原型链继承和构造函数得优点，是javascript中最常用得继承模式
 * 缺点： 组合继承最大的缺点是会调用两次父构造函数。
 */
function Parent2(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent2.prototype.getName = function() {
  console.log(this.name);
}

function Child2(name, age) {
  Parent2.call(this, name);
  this.age = age;
}

Child2.prototype = new Parent2();
Child2.prototype.constructor = Child2;

var child2 = new Child2('kevin', 18);
child2.colors.push('black');

console.log('child2.name', child2.name);
console.log('child2.age', child2.age);
console.log('child2.colors', child2.colors);

var child20 = new Child2('daisy', 21);
console.log('child20.name', child20.name);
console.log('child20.age', child20.age);
console.log('child20.colors', child20.colors);


/**
 * @description 
 * @param {any} o 
 * @returns 原型式继承
 * 就是ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。
 * 缺点：包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
 */
function Parent3(o) {
  function F() {};
  F.prototype = o;
  return new F();
}

var person = {
  name: 'kevin',
  friends: ['daisy', 'kelly']
}

var child3 = Parent3(person);
var child31 = Parent3(person);

child3.name = 'person3';
console.log('child3.name', child3.name);
console.log('child31.name', child31.name);

child3.friends.push('taylor');
console.log('child3.friends', child3.friends);
console.log('child31.friends', child31.friends);


//TODO: 这种继承方式还是没有太懂
/**
 * @description 寄生组合式继承
 * @param {any} o 
 * @returns 
 * 优点：引用《JavaScript高级程序设计》中对寄生组合式继承的夸赞就是：

这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；
因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
 */
function object(o) {
  function F() {};
  F.prototype = o;
  return new F();
}

function prototype(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}
// 当我们使用的时候：
prototype(child, Prent);