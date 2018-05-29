/** extend 第一版 */
function extend1() {
  var name, options, copy;
  let target = arguments[0];
  for (var i = 1, len = arguments.length; i < len; i++) {
    optoins = arguments[i];
    if (options != null) {
      for (name in options) {
        copy = options[name];
        if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
    
  }
  return target;
}

var obj1 = {
  a: 1,
  b: { b1: 1, b2: 2 }
};

var obj2 = {
  b: { b1: 3, b3: 4 },
  c: 3
};

var obj3 = {
  d: 4,
  c: [5]
}

console.log(extend1(obj1, obj2, obj3));

// {
//    a: 1,
//    b: { b1: 3, b2: 2, b3: 4 },
//    c: 3,
//    d: 4
// }

/** extend 第二版 */
/** 我们来实现深拷贝的功能，值得注意的是：
需要根据第一个参数的类型，确定 target 和要合并的对象的下标起始值。
如果是深拷贝，根据 copy 的类型递归 extend。*/

function extend2() {
  // 默认不进行深拷贝
  var deep = false;
  var name, optoins, src, clone, copy;
  var length = arguments.length;
  // 记录要复制的对象的下标
  var i = 1;
  // 第一个参数不传布尔值的情况下，target默认是第一个参数
  var target = arguments[0] || {};
  // 如果第一个参数是布尔值，那第二个参数才是target
  if (typeof target == 'boolean') {
    deep = target;
    target = arguments[1];
    i++;
  }

  // 如果target不是对象，我们无法进行复制，所以设为{}
  if (typeof target !== 'object' && Array.isArray(target)) {
    target = [];
  }
  if (typeof target !== 'object' && !Array.isArray(target)) {
    target = {};
  }

  // 循环遍历要复制的对象们
  for (; i < length; i++) {
    // 获取当前对象
    options = arguments[i];
    // 要求不能为空，避免extend2(a,,b)这种情况
    if (options != null) {
      for (name in options) {
        // 目标属性值
        src = target[name];
        // 要复制的对象的属性值
        copy = options[name];
        // deep 存在代表深拷贝
        if (deep && copy && typeof copy == 'object') {
          // 递归调用
          target[name] = extend2(deep, src, copy);
        }
        else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}

function extend3() {
  // 默认不进行深拷贝
  var deep = false;
  var name, optoins, src, copy;
  var length = arguments.length;

  // 用于处理拷贝和待拷贝的类型不一致问题
  var clone, copyIsArray;

  // 记录要复制的对象的下标
  var i = 1;
  // 第一个参数不传布尔值的情况下，target默认是第一个参数
  var target = arguments[0] || {};
  // 如果第一个参数是布尔值，那第二个参数才是target
  if (typeof target == 'boolean') {
    deep = target;
    target = arguments[1];
    i++;
  }

  // 如果target不是对象，我们无法进行复制，所以设为{}
  if (typeof target !== 'object') {
    target = {};
  }

  // 循环遍历要复制的对象们
  for (; i < length; i++) {
    // 获取当前对象
    options = arguments[i];
    // 要求不能为空，避免extend2(a,,b)这种情况
    if (options != null) {
      for (name in options) {
        // 目标属性值
        src = target[name];
        // 要复制的对象的属性值
        copy = options[name];

        /** 解决循环引用 */
        if (target === copy) {
          continue;
        }

        // deep 存在代表深拷贝
        /**为了解决这个问题，我们需要对目标属性值和待复制对象的属性值进行判断：

        判断目标属性值跟要复制的对象的属性值类型是否一致:

        如果待复制对象属性值类型为数组，目标属性值类型不为数组的话，目标属性值就设为 []

        如果待复制对象属性值类型为对象，目标属性值类型不为对象的话，目标属性值就设为 {} */
        if (deep && copy && 
           (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          
          if (copyIsArray) { // copy是数组
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }
          // 递归调用
          target[name] = extend3(deep, clone, copy);
        }
        else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}

console.log(extend3(true, obj1, obj2, obj3));


/** 思考题 */
var a = extend3(true, [4, 5, 6, 7, 8, 9], [1, 2, 3]);
console.log('思考题', a); // ???
var obj1 = {
    value: {
        3: 1
    }
}

var obj2 = {
    value: [5, 6, 7],

}

var b = console.log('思考题', extend3(true, obj1, obj2)); // ???
var c = console.log('思考题', extend3(true, obj2, obj1)) // ???