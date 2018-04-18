/** 1.1 初始化class */
/** 我们利用ES6的class关键字对Event进行初始化,包括Event的事件清单和监听者上限. */
/** 我们选择Map作为储存事件的结构,因为作为键值对的储存方式Map比一般对象更加适合,我们操作起来也更加简洁 */

class EventEmitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }
}

/** 1.2 监听与触发 */
/** 触发监听函数我们可以用apply与call两种方法,
 *  在少数参数时call的性能更好,多个参数时apply性能更好,当年Node的Event模块就在三个参数以下用call否则用apply。 */

// 触发名为type的事件,    type名 --- 参数
EventEmitter.prototype.emit = function(type, ...args) {
  let handler;
  // 从储存事件键值对的this._events中获取对应事件回调函数
  handler = this._events.get(type);
  if(args.length > 0) {
    console.log(args);
    console.log(this);
    handler.apply(this, args);
  } else {
    handler.call(this);
  }
  return true;
}

// 监听名为type的事件,    type名 --- 函数
EventEmitter.prototype.addListener = function(type, fn) {
  // 将type事件以及对应的fn函数放入this._events中储存
  if(!this._events.get(type)) {
    this._events.set(type, fn);
  }
}

// 我们实现了触发事件的emit方法和监听事件的addListener方法,至此我们就可以进行简单的实践了。

// 实例化
const emitter = new EventEmitter();

// 监听一个名为arson的事件对应一个回调函数
emitter.addListener('arsonq1', man => {
  console.log(`expel ${man}`);
});

// 触发arson事件，发现回调成功执行
emitter.emit('arsonq1', 'low_end');


/**
 *  升级改造
 */

/** 2.1 监听/触发器升级 */
/** 我们的addListener实现方法还不够健全,在绑定第一个监听者之后,
 *  我们就无法对后续监听者进行绑定了,因此我们需要将后续监听者与第一个监听者函数放到一个数组里. */

// 触发名为type的事件
EventEmitter.prototype.upgradeEmit = function(type, ...args) {
  let handler;
  handler = this._events.get(type);
  if(Array.isArray(handler)) {
    // 如果是一个数组说明由多个监听者，需要依次触发里面的函数
    for(let i = 0; i < handler.length; i++) {
      if (args.length > 0) {
        handler[i].apply(this, args);
      } else {
        handler[i].call(this);
      }
    }
  } else { // 单个函数的情况我们直接触发即可
    if (args.length > 0) {
      handler.apply(this, args);
    } else {
      handler.call(this);
    }
  }

  return true;
}

// 监听名为type的事件, 是写函数
EventEmitter.prototype.upgradeAddListener = function(type, fn) {
  const handler = this._events.get(type); // 获取对应事件名称的函数清单
  if(!handler) {
    this._events.set(type, fn);
  } else if (handler && typeof handler === 'function') {
    // 如果handler是函数，说明只有一个监听者
    this._events.set(type, [handler, fn]); // 多个监听者我们需要用数组储存
  } else {
    handler.push(fn); // 已经有多个监听者，那么直接往数组里push函数即可
  }
}

// 监听同一个事件名
emitter.upgradeAddListener('arson', man => {
  console.log(`expel ${man}`);
});
emitter.upgradeAddListener('arson', man => {
  console.log(`save ${man}`);
});

emitter.upgradeAddListener('arson', man => {
  console.log(`kill ${man}`);
});

// 触发事件
emitter.upgradeEmit('arson', 'low-end');
//expel low-end
//save low-end
//kill low-end


/** 思考：一个触发器emit可对应多个监听器，而这里，触发器只负责传参。监听器负责处理不同函数的执行。 */


/** 2.2 移除监听 */
/** 我们会用removeListener函数移除监听函数,但是匿名函数是无法移除的. */

EventEmitter.prototype.removeListener = function(type, fn) {
  const handler = this._events.get(type); // 获取对应事件名称的函数清单

  // 如果是函数，说明只被监听了一次
  if(handler && typeof handler === 'function') {
    this._events.delete(type, fn);
  } else {
    let position;
    // 如果handler是数组，说明被监听多次要找到对应的函数
    for(let i = 0; i < handler.length; i++) {
      if (handler[i] === fn) {
        position = i;
      } else {
        position = -1;
      }
    }

    // 如果找到匹配的函数，从数组中删除
    if(position !== -1) {
      handler.splice(position, 1);
      // 如果清除后只有一个函数，那么取消数组，以函数形式保存
      if (handler.length === 1) {
        this._events.set(type, handler[0]);
      } else {
        return this;
      }
    }

  }

};

/** 3 发现问题 */

/** 1. 鲁棒性不足: 我们没有对参数进行充分的判断,没有完善的报错机制.
    2. 模拟不够充分: 除了removeAllListeners这些方法没有实现以外,
例如监听时间后会触发newListener事件,我们也没有实现,另外最开始的监听者上限我们也没有利用到. */


