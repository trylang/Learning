/**
 * 介绍：
 * 1. 顺序访问一个序列；2. 使用者无需知道集合的内部结构（封装）;
 * 
 * 场景： 1. jQuery each; 2. ES6 Iterator;
 * 
 * ES6 Iterator 为何存在？
 * 1. ES6中，有序集合的数据类型特别多
 * （Array，Map，Set, String, TypeArray, arguments, nodeList）
 * 2. 需要有一个统一的遍历接口来遍历搜友数据类型；
 * 3. （注意：object不是有序集合，可以用Map代替）
 * 
 * ES6 Iterator 是什么？
 * 1. 以上数据类型，都有[Symbol.iterator]属性；
 * 2. 属性值是函数，执行函数返回一个迭代器；
 * 3. 这个迭代器就有next方法可顺序迭代子元素；
 * 4. 可运行Array.prototype[Symbol.iterator]来测试；
 * 
 * Symbol.interator 可用for...of 代替；
 */