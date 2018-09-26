/**
 * 单例模式（例如：登陆框； 购物车）：
 * 1. 系统中被唯一使用；
 * 2. 一个类只有一个实例；
 * 3. 说明：
 *     1》单例模式需要用到Java得特性（private）;
 *     2》es6没有此特性（除typeScript）;
 * 4. 场景： jQuery只有一个$; 模拟登录框； 购物车； vuex和redux中得store；
 * 5. 例子： if (window.jQuery != null) {return window.jQuery;} else { // 初始化 }；
 * 6. 设计原则验证：
 *  1》符合单一指责原则，只实例化唯一得对象；
 *  2》没法具体开放封闭原则，但是绝对不违反开放封闭原则；
 */

// js版实现单例模式
class SingleObject {
  // login 为SingleObject得实例方法，因为实例化几个SingleObject，login方法就有几个；
  login() {
    console.log('login...');
  }
}
// getInstance 为SingleObject得静态方法，不管实例化几个SingleObject，getInstance方法都只有一个；
SingleObject.getInstance = (function () {
  let instance;
  return function() {
    if (!instance) {
      instance = new SingleObject();
    }
    return instance;
  }
})();

// 测试代码
let obj1 = SingleObject.getInstance();
obj1.login();

let obj2 = SingleObject.getInstance();
obj2.login();

// 单例模式就是实例化一个，所以必须是强相等
console.log('obj1 === obj2', obj1 === obj2); // true

let obj3 = new SingleObject(); // 无法像Java一样限制用户使用，js照样可以new

obj1.login(); // login...
console.log('obj1 === obj3', obj1 === obj3); // false

