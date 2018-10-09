/**
 * 装饰器模式：
 * 1. 介绍：  1》为对象添加新功能；
 *    2》不改变其原有得结构和功能；
 * 2. 场景： ES7装饰器； core-decorators库
 * 3. 设计原则验证：
 *    1》将现有对象和装饰器进行分离，两者独立存在
 *    2》符合开放封闭原则
 * 装饰器不仅可以装饰类的方法还可以装饰类（但是不可以装饰函数，因为函数存在变量提升）
   装饰器函数接受3个参数 分别是装饰的对象，装饰的属性，装饰属性的描述
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



// 测试

function log(target, name, descriptor) {
  // target 目标class类；
  // name 目标class的属性名；
  // descriptor 目标属性名的 Object.defineProperty 中会用到
  console.log(target, name, descriptor)
  let oldValue = descriptor.value;
  descriptor.value = function() {
    console.log(`calling ${name} width`, arguments);
    return oldValue.apply(this, arguments);
  }
  return descriptor;
}

class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

let math = new Math();
const result = math.add(2, 4);
console.log('result', result);