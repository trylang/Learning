
/** pointfree 指的是函数无须替吉将要操作的数据是什么样的。
 *  需求：输入 'kevin'，返回 'HELLO, KEVIN'。
 */

// 非pointfree，因为提到了数据：name
var greet_demo = function(name) {
  return ('hello ' + name).toUpperCase();
}

function compose_demo(f, g) {
  return function(x) {
    return f(g(x));
  }
}

function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function() {
    var i = start;
    var result = args[start].apply(this,arguments);
    while(i--) result = args[i].call(this, result);
    return result;
  }
}

// pointfree
// 先定义基本运算，这些可以封装起来复用
var toUpperCase = function(x) {return x.toUpperCase()};
var hello = function(x) {return 'HELLO, ' + x};

var greet = compose(hello, toUpperCase);
console.log(greet('kevin'));


/** 需求二：输入 'kevin daisy kelly'，返回 'K.D.K' */
// 非pointfree, 因为提到了数据：name
var initials_demo = function(name) {
  return name.split(' ').map(compose(toUpperCase, head)).join('. ');
};

// pointfree
// 先定义基本运算
