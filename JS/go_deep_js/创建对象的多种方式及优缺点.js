/** 0. 工厂模式：
 *  缺点：对象无法识别，因为所有的实例都指向一个原型
 */
function Person0(name) {
  var o = new Object();
  o.name = name;
  o.getName = function() {
    console.log(this.name); // 指向Object
  }
  return o;
}
var person0 = Person0('kevin');

// 实例的构造函数属性（constructor）指向构造函数。
// 实例没有prototype对象；
// 只要是函数，都有constructor属性；
// 函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型，
// 也就是这个例子中的 person1 和 person2 的原型。
console.log('person0.constructor',person0.constructor);
console.log('Person0.prototype', Person0.prototype);

/** 2. 构造函数模式
 *  优点：实例可以识别为一个特定的类型
 *  缺点：每次创建实例时，每个方法都要被创建一次
 */
function Person1(name) {
  this.name = name;
  this.getName = function(){
    console.log(this.name);
  }
}
var person1 = new Person1('kevin');
console.log('person1.constructor',person1.constructor);
console.log('Person1.prototype', Person1.prototype);

/** 3. 原型模式
 *  优点： 方法不会重新创建
 *  缺点： 1.所有得属性和方法都共享； 2.不能初始化参数
 */
function Person2(name){};
Person2.prototype.name = 'Kevin';
Person2.prototype.getName = function() {
  console.log(this.name);
}
var person2 = new Person2();
console.log('person2.constructor',person2.constructor);
console.log('Person2.prototype', Person2.prototype);

/**
 * @description 2.1 原型模式优化
 * @param {any} name 
 * 优点：封装性好一些
 * 缺点：重写了原型，丢失了construtor属性
 */
function Person21(name) {};
Person21.prototype = {
  name: 'kevin21',
  getnName: function() {
    console.log(this.name);
  }
}
var person21 = new Person21();
console.log('person21.constructor',person21.constructor);
console.log('Person21.prototype', Person21.prototype);

/**
 * @description 2.2 原型模式再优化
 * @param {any} name 
 * 优点：实例可以通过constructor属性找到所属构造函数
 * 缺点：原型模式该有的缺点还是有
 */
function Person22(name) {};
Person22.prototype = {
  constructor: Person22,
  name: 'kevin22',
  getnName: function() {
    console.log(this.name);
  }
}
var person22 = new Person22();
console.log('person22.constructor',person22.constructor);
console.log('Person22.prototype', Person22.prototype);

/**
 * @description 4. 组合模式
 * @param {any} name 
 * 优点：该共享得共享，该私有得私有，使用最广泛得方式
 * 缺点：有的人就是希望全部都写在一起，即更好的封装性
 */
function Person3(name) {
  this.name = name;
}
Person3.prototype = {
  constructor: Person3, // 必须加constructor属性，不然会指向Object，而不是原型
  getName: function() {console.log(this.name)}
}
var person3 = new Person3();
console.log('person3.constructor',person3.constructor);
console.log('Person3.prototype', Person3.prototype);

/**
 * @description 4.1动态原型模式
 * @param {any} name 
 * 注意： 使用动态原型模式时，不能用对象字面量重写原型
 */
function Person31(name) {
  this.name = name;
  if (typeof this.getName != 'function') {
    Person31.prototype.getName = function() {
      console.log(this.name);
    }
  }
}
var person31 = new Person31();
console.log('person31.constructor',person31.constructor);
console.log('Person31.prototype', Person31.prototype);

/**
 * @description 解释下为啥不能用字面量重写
 * @param {any} name 
 */
function Person311(name) {
  this.name = name;
  if (typeof this.getName != "function") {
      Person311.prototype = {
        constructor: Person311, // 指向原来得原型，而原来得原型还没有getName方法，需要new一下
        getName: function () {
            console.log(this.name);
        }
      }
      console.log('dss', Person311.prototype);
  }
}
// 报错 并没有该方法
var person311 = new Person311('kevin');
// 注释掉上面的代码，这句是可以执行的。
var person312 = new Person311('daisy');
// person311.getName();
person312.getName();


/**
 * @description 就想用字面量重写，就这么做
 * @param {any} name 
 */
function Person312(name) {
  this.name = name;
  if (typeof this.getName != "function") {
      Person312.prototype = {
        constructor: Person312, // 指向原来得原型，而原来得原型还没有getName方法，需要new一下
        getName: function () {
            console.log(this.name);
        }
      }
      return new Person312(name);
  }
}
// 报错 并没有该方法
var person313 = new Person312('kevin');
// 注释掉上面的代码，这句是可以执行的。
var person314 = new Person312('daisy');
person313.getName();
person314.getName();


/**
 * @description 寄生构造函数模式
 * @param {any} name 
 * @returns 
 *  特点：所谓的寄生构造函数模式就是比工厂模式在创建对象的时候，多使用了一个new，实际上两者的结果是一样的。
 *  在可以使用其他模式的情况下，不要使用这种模式。
 */
function Person41(name) {

  var o = new Object();
  o.name = name;
  o.getName = function () {
      console.log(this.name);
  };

  return o;

}

var person41 = new Person41('kevin');
console.log(person41 instanceof Person41) // false
console.log(person41 instanceof Object)  // true


/**
 * @description 稳妥构造函数
 * @param {any} name 
 * @returns 
 * 特点： 所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。
 *  与寄生构造函数模式有两点不同：
    新创建的实例方法不引用 this
    不使用 new 操作符调用构造函数
    稳妥对象最适合在一些安全的环境中。
    稳妥构造函数模式也跟工厂模式一样，无法识别对象所属类型。
 */
function person52(name){
  var o = new Object();
  o.sayName = function(){
      console.log(name);
  };
  return o;
}

var person521 = person52('kevin');

person521.sayName(); // kevin

person521.name = "daisy";

person521.sayName(); // kevin

console.log(person521.name); // daisy