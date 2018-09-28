/**
 * 装饰器模式：
 * 1. 介绍：  1》为对象添加新功能；
 *    2》不改变其原有得结构和功能；
 * 2. 场景： ES7装饰器； core-decorators库
 * 3. 设计原则验证：
 *    1》将现有对象和装饰器进行分离，两者独立存在
 *    2》符合开放封闭原则
 */

class Circle {
  draw() {
    console.log('画一个圆形');
  }
}

class Decorator {
  constructor(circle) {
    this.circle = circle;
  }
  setRedBorder(circle) {
    console.log('设置红色边框')
  }
  draw() {
    this.circle.draw();
    this.setRedBorder();
  }

}

// 测试代码
let circle = new Circle();
circle.draw();

let dec = new Decorator(circle);
dec.draw()


// ==========   简单的demo  ======================

@testDec
class Demo {
  // ...
}
function testDec(target) {
  target.isDec = true;
}
console.log(Demo.isDec); // true


// 装饰器的原理
@decorator
class A {}

// 等同于
class A {}
A = decorator(a) || A;  


// ========== 如果装饰器要专递参数，那就需要装饰器函数里面再返回一个函数

// 这里与不传参区别就是（参数），
// 多了（），就说明已经执行了一次函数，然后把class B再传递给其内部函数再执行
@testDec2(true) 
class B {
  // ...
}

function testDec2(isDec) {
  return function(target) {
    target.isDec = isDec;
  }
}

// 测试代码
console.log(Demo.isDec);


// 场景二（装饰类和方法）
function mixins(...list) {
  return function(target) {
    Object.assign(target.prototype, ...list);
  }
}

const Foo = {
  foo() {
    console.log('foo');
  }
}

@mixins(Foo)
class MyClass {
  // ...
}

let obj = new MyClass();
obj.foo(); // MyClass的实例就有了装饰器的函数