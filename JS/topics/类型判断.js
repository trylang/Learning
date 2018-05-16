/** 写一个 type 函数能检测各种类型的值，如果是基本类型，就使用 typeof，引用类型就使用 toString。此外鉴于 typeof 的结果是小写，我也希望所有的结果都是小写。

考虑到实际情况下并不会检测 Math 和 JSON，所以去掉这两个类型的检测。

我们来写一版代码： */
var class2type = {};
"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(' ').map(item => {
  class2type["[object " + item + "]"] = item.toLowerCase();
});
console.log(class2type);

function type1(obj) {
  return typeof obj === "object" || typeof obj === "function" 
         ? class2type[Object.prototype.toString.call(obj)] || "object"
         : typeof obj;
}

/** ，看起来很完美的样子~~ 但是注意，在 IE6 中，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]！

我去，竟然还有这个兼容性！有什么简单的方法可以解决吗？那我们再改写一版，绝对让你惊艳！ */
function type2(obj) {
  // 一箭双雕
  if (obj == null) {
      return obj + "";
  }
  console.log(Object.prototype.toString.call(obj))
  return typeof obj === "object" || typeof obj === "function" ?
      class2type[Object.prototype.toString.call(obj)] || "object" :
      typeof obj;
}

console.log(type2(function(){}));