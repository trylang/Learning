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
  d: 4
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
  var name, optoins, src, copy;
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

console.log(extend2(true, obj1, obj2, obj3));