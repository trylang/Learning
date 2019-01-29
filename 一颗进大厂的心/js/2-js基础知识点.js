console.log([] == ![]); // true

// 1. 闭包： 可以间接访问函数内部的变量

// 浅拷贝
// 浅拷贝有：Object.assign()，很多人认为此函数是深拷贝，其实不然，Object.assign只会拷贝所有的属性值到新的对象中，但如果属性值是对象的话，拷贝的是地址，所以并不是深拷贝;
let a = {age: 1, type: {}}; let b = Object.assign({}, a);
a.age = 2; console.log(b.age); // 1 
a.type.name = 'heihei'; console.log(b.type.name);  // 'heihei', 值已变
// 通过展开运算符...实现浅拷贝 let b = {...a};

// 深拷贝
// 1. JSON.parse(JSON.stringfy(object));缺点就是：会忽略undefined，symbol, 不能序列化函数，不能解决循环引用的对象



