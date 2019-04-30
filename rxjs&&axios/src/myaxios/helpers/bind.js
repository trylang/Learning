module.exports = function bind(fn, thisArg) {
  // 获取bind函数从第二个参数到最后一个参数
  var args1 = Array.prototype.slice.call(arguments, 1); 
  return function wrap() {
    var args2 = Array.prototype.slice.call(arguments);
    // var args = new Array(arguments.length);
    // for (var i = 0; i < args.length; i++) {
    //   args[i] = arguments[i];
    // }
    return fn.apply(thisArg, args1.concat(args2));
  }
}