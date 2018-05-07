// Otaku 御宅族，简称宅
function Otaku (name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games';
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}

var person = objectFactory(Otaku, 'Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin

/** 原型与原型链，我们知道实例的 __proto__ 属性会指向构造函数的 prototype，也正是因为建立起这样的关系，实例可以访问原型上的属性。 */

// 第一版代码
function objectFactory() {
  var obj = new Object();
  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, arguments);
  return obj;
};

/** 第一版： 
 *  1. 用new Object()的方式新建一个对象obj;
 *  2. 取出第一个参数，也就是我们要传入的构造函数，因为shift会修改原数组，所以arguments会被去除第一个参数；
 *  3. 将obj的原型指向构造函数，这样obj就可以访问到构造原型中的属性；
 *  4. 使用apply，改变构造函数this的指向到新建的对象，这样obj就可以访问到构造函数中的属性
 *  5. 返回 obj
 */

/** 第二个问题：如果构造函数有返回值 */
function Otaku1 (name, age) {
  this.strength = 60;
  this.age = age;

  return {
      name: name,
      habit: 'Games'
  }
}

// var person1 = new Otaku1('Kevin', '18');
var person1 = objectFactory2(Otaku1, 'kevin', '21');

console.log(person1.name) // Kevin
console.log(person1.habit) // Games
console.log(person1.strength) // undefined
console.log(person1.age) // undefined

function objectFactory1() {
  var obj = new Object();
  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret: obj;
};

/** 微醺岁月的模拟 */
function objectFactory2() {
  var obj = new Object(); // 从Object.prototype上克隆一个对象
  Constructor = [].shift.call(arguments); // 取得外部传入得构造器
  var F = function(){};
  F.prototype = Constructor.prototype;
  obj = new F(); // 指向正确得原型
  var ret = Constructor.apply(obj, arguments); // 借用外部传入的构造器给obj设置属性
  return typeof ret === 'object' ? ret : obj;  // 确保构造器总是返回一个对象
}

