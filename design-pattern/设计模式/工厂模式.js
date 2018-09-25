/**
 *  1. 将new 操作单独封装
 *  2. 遇到new时，就要考虑是否该使用工厂模式
 */

/**
 * 聊聊如何写好代码：（阅读经典lib源码；拿来主义特别快 ）
 * 1. 最基本的：看如何实现功能；
 * 2. 在上一层：看是如何设计这个功能的；
 * 3. 强制自己学习这种设计方式写代码（多看，多模拟，拿来主义非常快）；
 */

/**
 * 工厂模式 --- 设计原则验证
 * 1. 构造函数和创建者分离；
 * 2. 符合开放封闭原则；
 */

/**
 * @description/
 * @class Product
/**
 * @description/
 * @class Product
 */
class Product {
  constructor (name) {
    this.name = name;
  }
  init() {
    console.log('init');
  }
  func1() {
    console.log('func1')
  }
}

class Creator {
  create (name) {
    return new Product(name);
  }
}

let createor1 = new Creator().create('haha');

console.log(createor1.init())
console.log(createor1.func1())



/**
 * 场景：
 * 1. jQuery - $('div')
 * 2. React.createElement
 * 3. vue 异步组件
 */

// 1. jquery
class jQuery {
  constructor(selector) {

   }
  append(node) {}
}

window.$ = function(selector) {
  return new jQuery(selector);
}

// 2. React.createElement
class Vnode(tag, attrs, children) {
  // ...
}

React.createElement = function(tag, attrs, children) {
  return new Vnode(tag, attrs, children);
}

// 实例：
var profile = React.createElement('div', null, 
  React.createElement('img', {src: 'avatar.png', className: 'profile'}), 
  React.createElement('h3', null, [user.firstName, user.lastName].join(' ')), 
);

// jiexi
<div>
  <img src="avatar.png" className="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>