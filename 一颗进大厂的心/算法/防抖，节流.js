// 防抖  --- 一个用户一直触发某个函数，且每次触发函数得间隔小于wait，防抖得情况只会调用一次。而节流则是每隔一定时间（wait）调用函数。

// 简单版 （只能延迟wait秒执行，应用场景是搜索）
const debounce = (func, wait = 50) => {
  let timer = 0;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

// 具有立即执行和可延迟执行得选项（应用场景是点赞或者点击按钮，第一次立即执行，下一次调用则必须与前一秒调用时间间隔大于wait才会触发）
const debounce2 = (func, wait = 50, immediate = true) => {
  let timer, context, args;
  // 延迟执行函数
  const later = () => {
    return setTimeout(() => {
      timer = null;
      if (!immediate) {
        func.apply(context, args);
        context = args = null;
      }
    }, wait);
  };
  return function(...params) {
    if (!timer) {
      timer = later();
      if (!immediate) {
        // 延迟执行
        context = this;
        args = params;
      } else {
        func.apply(this, params);
      }
    } else {
      clearTimeout(timer);
      timer = later();
    }
  };
};

function sayHi(e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}
// window.addEventListener('resize', debounce2(sayHi, 500, false));

// 节流（简洁版）
function throttle(func, wait) {
  var timer, context, args, startTime = new Date();

  return function(...params) {
    context = this; args = params;
    var currentTime = new Date();
    var remaining = wait - (currentTime - startTime);
    if (timer) {
      clearTimeout(timer);
    }

    // remaining <= 0 得情况是wait 等待得时间太短，操作时间间隔太长；
    // remaining > wait 得情况是 等待时间太多，但是操作间隔时间太短
    if (remaining <= 0 || remaining > wait) { // 达到规定时间间隔，触发函数
      func.apply(context, args);
      startTime = currentTime;
    } else { // 没达到触发函数，重新设定定时器
      timer = setTimeout(() => {
        func.apply(context, args);
      }, time)
    }
  }
}


// 这个是用来获取当前时间戳的
function _now() {
  return +new Date()
}

var throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  // 之前的时间戳
  var previous = 0;
  // 如果 options 没传则设为空对象
  if (!options) options = {};
  // 定时器回调函数
  var later = function() {
    // 如果设置了 leading，就将 previous 设为 0
    // 用于下面函数的第一个 if 判断
    previous = options.leading === false ? 0 : _now();
    // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    // 获得当前时间戳
    var now = _now();
    // 首次进入前者肯定为 true
    // 如果需要第一次不执行函数
    // 就将上次时间戳设为当前的
    // 这样在接下来计算 remaining 的值时会大于0
    if (!previous && options.leading === false) previous = now;
    // 计算剩余时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果当前调用已经大于上次调用时间 + wait
    // 或者用户手动调了时间
    // 如果设置了 trailing，只会进入这个条件
    // 如果没有设置 leading，那么第一次会进入这个条件
    // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
    // 其实还是会进入的，因为定时器的延时
    // 并不是准确的时间，很可能你设置了2秒
    // 但是他需要2.2秒才触发，这时候就会进入这个条件
    if (remaining <= 0 || remaining > wait) {
      // 如果存在定时器就清理掉否则会调用二次回调
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // 判断是否设置了定时器和 trailing
      // 没有的话就开启一个定时器
      // 并且不能不能同时设置 leading 和 trailing
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

window.addEventListener("resize", throttle(sayHi, 500000));
