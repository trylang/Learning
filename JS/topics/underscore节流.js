/** 节流的原理：如果你持续触发事件，每隔一段时间，只执行一次事件。

根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次。

关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。 */


/** 使用时间戳：让我们来看第一种方法：使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )，如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。
看了这个表述，是不是感觉已经可以写出代码了…… 让我们来写第一版的代码： */

var count = 1;
var container = document.getElementById('container');

function getUserAction() {
  container.innerHTML = count++;
};
/**
 * @description 第一版 使用时间戳
 * @param {any} func 
 * @param {any} wait 
 * @returns 
 */
function throttle1(func, wait) {
  var context, args;
  var previous = 0;
  
  return function() {
    var now = +new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}

function throttle2(func, wait) {
  var timer;
  var context, args;
  var previous = 0;
  return function() {
    context = this;
    args = arguments;
    if (!timer) {
      timer = setTimeout(function() {
        timer = null;
        func.apply(context, args);
      },wait);
    }
  }
}

// 我们可以看到：当鼠标移入的时候，事件不会立刻执行，晃了 3s 后终于执行了一次，此后每 3s 执行一次，当数字显示为 3 的时候，立刻移出鼠标，相当于大约 9.2s 的时候停止触发，但是依然会在第 12s 的时候执行一次事件。

// 所以比较两个方法：

// 第一种事件会立刻执行，第二种事件会在 n 秒后第一次执行
// 第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件

/**
 * @description 双剑合璧：有人就说了：我想要一个有头有尾的！就是鼠标移入能立刻执行，停止触发的时候还能再执行一次！
 * 所以我们综合两者的优势，然后双剑合璧，写一版代码：
 * @param {any} func 
 * @param {any} wait 
 * 
 */
function throttle3(func, wait) {
  var timer, context, args, result;
  var previous = 0;
  
  var later = function() {
    previous = +new Date();
    timer = null;
    func.apply(context, args);
  };

  var throttled = function() {
    var now = +new Date();
    // 下次触发func剩余的时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果没有剩余时间或者改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timer) {
      timer = setTimeout(later, remaining);
    }
  } 

  return throttled;
}

container.onmousemove = throttle2(getUserAction, 2000);

//TODO: 节流问题还需要再看一下，现在分析不清楚