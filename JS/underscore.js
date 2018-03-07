(function() {
  console.log(this);
  // this 指向window,获得全局变量
  var root = this;
  // 保存全局环境下的_变量，到时候进行复制
  var previousUnderscore = root._;
  console.log(previousUnderscore);
  
  // 实现更少的字节和作用域查找， (可以再浏览数上看原型上有什么内置的方法)
  var ArrayProto = Array.prototype,
      ObjectProto = Object.prototype,
      FuncProto = Function.prototype;

  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjectProto.toString,
      hasOwnProperty = ObjectProto.hasOwnProperty;

  // 原生的es5方法
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeBind = FuncProto.bind,
      nativeCreate = Object.create;

})(this);