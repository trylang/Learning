/** 需求：我们现在需要写一个 foo 函数，这个函数返回首次调用时的 Date 对象，注意是首次。 */

/** 第一次：闭包
 *  缺点：我们现在需要写一个 foo 函数，这个函数返回首次调用时的 Date 对象，注意是首次。
 */
var foo1 = function() {
  var t;
  return function() {
    if (t) return t;
    t = new Date();
    return t;
  }
}

/** 解决二：函数对象
 *  函数也是一种对象，利用这个特性，我们也可以解决这个问题
 *  缺点： 依旧没有解决调用时都必须执行一次判断的问题
 */

var foo2 = function() {
  if (foo.t) return foo.t;
  foo.t = new Date();
  return foo.t;
}

/** 解决三：惰性函数
 *  惰性函数就是解决每次都要判断的这个问题，解决原理很简单，重写函数。
 */
var foo3 = function() {
  var t = new Date();
  foo3 = function() {
    return t;
  }
  return foo3();
}

/** 更多应用：判断兼容性 */

// 简化写法
function addEvent(type, el, fn) {
  console.log(33)
  if (window.addEventListener) {
    addEvent = function(type, el, fn) {
      console.log(7777)
    }
  }
  else if (window.attachEvent) {
    // el.attachEvent('on', type, fn);
  }
}

// 使用闭包再写一次
var addEvent1 = (function () {
  if (window.addEventListener) {
    return function(type, el, fn) {
      console.log(777);
    }
  }
  else if (window.attachEvent) {
    return function(type, el, fn) {
      console.log('66666');
    }
  }
})()

addEvent1(); // 777
addEvent1(); // 777
