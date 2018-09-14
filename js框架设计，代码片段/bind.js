/**
 * bind shi apply变种，可以劫持this，并且预先注入参数，返回后续执行方法。
 */

 var bind = function(bind) {
   return {
     bind: bind.bind(bind),
     call: bind.bind(bind.call),
     apply: bind.bind(bind.apply)
   }
 }(Function.prototype.bind);

var hasOwn = bind.call(Object.prototype.hasOwnProperty)

console.log(hasOwn({a: 2}, "a"))
console.log({a: 1}.hasOwnProperty('a'))
