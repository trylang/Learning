/** 函数柯里化：curry 的这种用途可以理解为：参数复用。本质上是降低通用性，提高适用性。 */

// 第一版
var curry1 = function(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
    var newArgs = args.concat([].slice.call(arguments));
    return fn.apply(this, newArgs);
  }
}

function add(a, b) {return a + b;}
var addCurry = curry1(add, 1, 2);addCurry() // 3
//或者
var addCurry = curry1(add, 1);addCurry(2) // 3
//或者
var addCurry = curry1(add);addCurry(1, 2) // 3


/** 第二版：极简版 */
function sub_curry2(fn) {
  return function() {
    return fn();
  }
}

function curry2(fn, length) {
  length = length || 4;
  return function() {
    if (length > 1) {
      return curry2(sub_curry2(fn), --length);
    } else {
      return fn();
    }
  }
}

// var fn0 = function(a, b, c, d) {
//   return [a, b, c, d];
// }

// var fn1 = curry2(fn0);

// fn1("a", "b")("c")("d");

// fn1("a", "b") = curry2(fn0)("a", "b") = curry2(sub_curry2(fn, "a", "b"), 3);


// var fn11 = function() {
//   return fn0("a", "b")
// };

// fn1("a", "b")("c") = curry2(sub_curry2(fn0, "a", "b"), 2)("c")
//  = curry2(fn11, 2)("c")
 
//  = curry2(function() {
//    return fn11();
//    = fn0("a", "b", "c");
//  })
//  = curry2(function() {
//    return fn0("a", "b", "c");
//  })

//  fn22 = function() {
//   return fn0("a", "b", "c");
// }

//  fn1("a", "b")("c")("d") = curry2(fn22, 2)("d")
//   = curry2(sub_curry2(fn22), 1);
//   = sub_curry2(fn22)()
//   = fn22()
//   = fn0("a", "b", "c", "d")

/** 第三版： 更易懂的实现 */
function curry3(fn, args) {
  var length = fn.length;
  console.log(length);
  args = args || [];
  
  return function() {
    var _args = args.slice(0), arg, i;
    console.log(arguments);

    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      _args.push(arg);
    }

    if (_args.length < length) {
      return curry1.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  }
}

var fn = curry3(function(a, b, c) {
  console.log([a, b, c]);
});
console.log(fn("a", "b"))
// fn("a", "b") // ["a", "b", "c"]
// var haha = function(a, b, c) {
//   console.log([a, b, c]);
// };
// fn("a", "b", "c") = currys3(haha)("a", "b", "c")
//   = 
// fn("a", "b")("c") // ["a", "b", "c"]
// fn("a")("b")("c") // ["a", "b", "c"]
// fn("a")("b", "c") // ["a", "b", "c"]

var curry4 = fn => judge = (...args) => 
  args.length === fn.length
  ? fn(...args) 
  : (arg) => judge(...args, arg);

var curry5 = function(fn) {
  let judge = function(...args) {
    if (args.length === fn.length) {
      return fn(...args);
    } else {
      return function (arg) {
        judge(...args, arg);
      }
    }
  }
  return judge;
}

var fn5 = curry5(function(a, b, c) {
  console.log([a, b, c]);
});
fn5("a", "b")("c");


/** 第三版：
 *  curry 函数写到这里其实已经很完善了，但是注意这个函数的传参顺序必须是从左到右，
 *  根据形参的顺序依次传入，如果我不想根据这个顺序传呢？curry 函数写到这里其实已经很完善了，但是注意这个函数的传参顺序必须是从左到右，根据形参的顺序依次传入，如果我不想根据这个顺序传呢？
 */

function curry6(fn, args, holes) {
  let length = fn.length;
  args = args || [];
  holes = holes || [];

  return function() {

    var _args = args.slice(0),
    _holes = holes.slice(0),
    argsLen = args.length,
    holesLen = holes.length,
    arg, i, index = 0;

    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      // 处理类似fn6(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
      if (arg === _ && holesLen) {
        index++
        if (index > holesLen) {
          _args.push(arg);
          _holes.push(argsLen - 1 + index - holesLen)
        }
      }
      // 处理类似 fn(1)(_)这种情况
      else if (arg === _) {
        _args.push(arg);
        _holes.push(argsLen + i);
      }
      // 处理类似fn(_, 2)(1) 这种情况
      else if (holesLen) {
        // fn(_, 2)(_, 3)
        if (index >= holesLen) {
          _args.push(arg);
        }
        // fn(_, 2)(1) 用参数 1 替换占位符
        else {
          _args.splice(_holes[index], 1, arg);
          _holes.splice(index, 1);
        }
      }
      else {
        _args.push(arg);
      }
    }

    if (_holes.length || _args.length < length) {
      return curry6.call(this, fn, _args, _holes);
    }
    else {
      return fn.apply(this, _args);
    }

  }
}

var _ = {};

var fn6 = curry6(function(a, b, c, d, e) {
    console.log([a, b, c, d, e]);
});

// 验证 输出全部都是 [1, 2, 3, 4, 5]
// fn6(1, 2, 3, 4, 5);
// fn6(_, 2, 3, 4, 5)(1);
// fn6(1, _, 3, 4, 5)(2);
// fn6(1, _, 3)(_, 4)(2)(5);
fn6(1, _, _, 4)(_, 3)(2)(5);
fn6(_, 2)(_, _, 4)(1)(3)(5);

