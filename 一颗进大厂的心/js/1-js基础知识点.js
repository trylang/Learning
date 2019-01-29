// 1. 原始类型和对象类型的区别？
// a. 原始类型存储的是值，但对象类型存储的是地址（指针）;
// b. 原始类型存在堆中，引用类型存在栈中；

// const a =[],假设内存地址（指针）为#001，那地址#001的位置存放了值[],常量a存放了地址#001；
const a = []; const b = a; b.push(1); console.log(a); // [1]

// 当我们将变量赋值给另外一个变量时，复制的是原本变量的地址（指针），也就是说当前变量b存放的地址也是#001，当我们进行数据修改的时候，就会修改存放在地址#001上的值，
// 也就导致了两个变量的值都会发生改变。


// 2. 如果函数参数是对象的情况
function test (person) {
    person.age = 26; // 变量仍指向同一块内存地址
    person = {       // 原始类型存储的都是值， 而此时赋值的是对象，就会新分配一个地址，与之前的地址没有了关系
        name: 'Jane',
        age: 30
    }
    return person;
}
const p1 = {
    name : 'Jane_p1',
    age: 25
}
const p2 = test(p1);
console.log(p1); // {name: 'Jane_p1', age: 26};
console.log(p2); // {name: 'Jane', age: 30};
console.log(p1); // {name: 'Jane_p1', age: 26};

// 解析：
// 首先，函数传参是传递对象指针的副本；
// 到函数内部修改参数的属性这步，这是p1的值也被修改了；
// 但是当我们重新为了person分配了要给对象时，person就拥有了一个新的地址，也就和p1没有任何关系了，最终导致两个变量的值是不相同的；



// 在js中，存在6种原始值，分别是：
// Boolean，null, undefined, number, string, symbol
// 原始类型存储的都是值，是没有函数可以调用的。


// 4.  判断对象类型: str instanceof String === true， typeof
// 5. 对象转原始类型，优先级依次是：
// Symbol.toPrimitive, 说先调用内置的[[ToPrimitive]]函数;
// => x.valueOf(); => x.toString()方法；


// 6. this
function foo() {
    console.log(this.c);
}
var c = 1; 
foo(); // 1

const obj = {
    c: 2,
    foo: foo
}
obj.foo(); //2 

const new_foo = new foo() // undefined

// 6.1 箭头函数中的this只取决于包裹箭头函数的第一个普通函数的this；
// 另外，对箭头函数使用bind这类函数是无效的。

// 6.2 this 取决于第一个参数，如果第一个参数为空，那么就是window。

// 6.3 但如果对一个函数进行多次bind,上下文会是什么呢？
let aa = {};
let fn = function() {console.log('this指向', this)};
fn.bind().bind(aa)(); // window

// fn.bind().bind(aa) 相当于
let fn1 = function () {
    return function() {
        return fn.apply();
    }.apply(aa)
}
fn1();
// 这就说明：不管我们给函数bind几次，fn中的this永远由第一次bind决定。


// this总结规则：
// 首先，new的方式优先级最高，其次是bind这些函数，然后是obj.foo()的调用方式，最后是foo这种的调用方式；
// 同时，箭头函数的this一旦被绑定，就不会被任何方式所改变。



