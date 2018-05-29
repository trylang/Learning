/** lainObject
plainObject 来自于 jQuery，可以翻译成纯粹的对象，所谓"纯粹的对象"，就是该对象是通过 "{}" 或 "new Object" 创建的，该对象含有零个或者多个键值对。

之所以要判断是不是 plainObject，是为了跟其他的 JavaScript对象如 null，数组，宿主对象（documents）等作区分，因为这些用 typeof 都会返回object。

jQuery提供了 isPlainObject 方法进行判断，先让我们看看使用的效果：

function Person(name) {
    this.name = name;
}

console.log($.isPlainObject({})) // true

console.log($.isPlainObject(new Object)) // true

console.log($.isPlainObject(Object.create(null))); // true

console.log($.isPlainObject(Object.assign({a: 1}, {b: 2}))); // true

console.log($.isPlainObject(new Person('yayu'))); // false

console.log($.isPlainObject(Object.create({}))); // false
由此我们可以看到，除了 {} 和 new Object 创建的之外，jQuery 认为一个没有原型的对象也是一个纯粹的对象。 */


/** jquery 源码 */

// 写type函数时，用于存放toSting映射结果的对象
var class2type = {};

// 相当于 Object.prototype.toString
var toString = class2type.toString;

// 相当于 Object.prototype.hasOwnProperty
var hasOwn = class2type.hasOwnProperty;

function isPlainObject(obj) {
  var proto, Ctor;
  
  // 排除掉明显不是obj得以及一些宿主对象如window
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }

  /**
   * @description es5方法，获取obj的原型
   * @param {any} obj 以new Object 创建的对象为例的话
   * @returns obj._proto_ === Object.prototype
   */
  proto = Object.getPrototypeOf(obj);

  // 没有原型的对象是纯粹的，Object.create(null)就在这里返回true
  if (!proto) return true;

  /**
   * @description 以下判断通过 new Object方式创建的对象
   * @param {any} obj 判断proto是否有constructor属性，如果有就让Ctor的值为proto.constructor
   * @returns 如果是Object函数创建的对象，Ctor在这里就等于Object构造函数
   */
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;

  // 在这里判断Ctor构造函数是不是Object构造函数，用于区分自定义构造函数和Object构造函数
  return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}