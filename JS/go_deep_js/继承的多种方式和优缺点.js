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
