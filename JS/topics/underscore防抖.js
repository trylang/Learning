var count = 1;
var container = document.getElementById('container');

function getUserAction() {
  container.innerHTML = count++;
};

// container.onmousemove = getUserAction;


/** 防抖：防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，
 *  如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，
 *  总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行，真是任性呐! */

// 第一版
function debounce1(func, wait) {
  var timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(func, wait);
  }
}
// container.onmousemove = debounce1(getUserAction, 500);

/**
 * @description 第二版：this指向正确的对象
 * @param {any} func 
 * @param {any} wait 
 */
function debounce2(func, wait) {
  var timer;
  return function() {
    var context = this;
    clearTimeout(timer);
    timeout = setTimeout(function() {
      func.apply(context);
    }, wait);
  }
}

/**
 * @description 第三版：提供事件对象event
 * @param {any} func 
 * @param {any} wait 
 */
function debounce3(func, wait) {
  var timer;
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timeout = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  }
}

/**
 * @description 第四版：立刻执行
 * @param {any} func 
 * @param {any} wait 
 * 我不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。
 * 想想这个需求也是很有道理的嘛，那我们加个 immediate 参数判断是否是立刻执行。
 */
function debounce4(func, wait, immediate) {
  var timer, result;

  return function() {
    var context = this;
    var args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      // 如果已经执行过，就不再执行
      var callNow = !timer;
      timer = setTimeout(function() {
        timer = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    }
    else {
      timer = setTimeout(function() {
        result = func.apply(context, args);
      }, wait);
    }
    return result;
  }
}

function debounce5(func, wait, immediate) {
  var timer, result;
  var debounced = function() {
    var context = this;
    var args = arguments;
    
    if (timer) clearTimeout(timer);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timer;
      timer = setTimeout(function() {
        timer = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    }
    else {
      timer = setTimeout(function() {
        func.apply(context, args);
      })
    }
    return result;
  }
  debounced.cancel = function() {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}
var setUseAction = debounce5(getUserAction, 1000, true);
container.onmousemove = setUseAction;
document.getElementById("button").addEventListener('click', function(){
  setUseAction.cancel();
})


