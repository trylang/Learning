
/** http://www.ruanyifeng.com/blog/2014/12/unicode.html  Unicode与JavaScript详解 */
/** https://juejin.im/post/5aa8a07cf265da238a3022a4?utm_source=gold_browser_extension  几道高级前端面试题解析 */

/**
 *   0.1 + 0.2 != 0.3
 */


/**
 * 10 个 Ajax 同时发起请求，全部返回展示结果，并且至多允许三次失败，说出设计思路. 
 */

/** 这个问题相信很多人会第一时间想到 Promise.all ，但是这个函数有一个局限在于如果失败一次就返回了，直接这样实现会有点问题，需要变通下。以下是两种实现思路 */

// 不完整代码，非promise写法
let successCount = 0;
let errorCount = 0;
let datas = [];

ajax(url, (res) => {
  if (sucess) {
    successCount++;
    if (successCount + errorCount === 10) {
      console.log(datas);
    } else {
      datas.push(res.data);
    }
  } else {
    errorCount++;
    if (errorCount > 3) {
      // 失败次数大于3次就应该报错了
      throw Error('失败三次');
    }
  }
})

// Promise 写法
let errorCount = 0;
let p = new Promise((resolve, reject) => {
  if (success) {
    resolve(res.data);
  } else {
    errorCount++;
    if (errorCount > 3) {
      reject(error);
    } else {
      resolve(error);
    }
  }
})

Promise.all([p]).then(v => {
  console.log(v);
})


/**
 *  基于 Localstorage 设计一个 1M 的缓存系统，需要实现缓存淘汰机制.
 */

/** 1. 存储的每个对象需要添加两个属性：分别是过期时间和存储时间。
    2. 利用一个属性保存系统中目前所占空间大小，每次存储都增加该属性。当该属性值大于 1M 时，需要按照时间排序系统中的数据，删除一定量的数据保证能够存储下目前需要存储的数据。
    3. 每次取数据时，需要判断该缓存数据是否过期，如果过期就删除。
 */

class Store {
  constructor() {
    let store = localStorage.getItem('cache');
    if (!store) {
      store = {
        maxSize: 1024 * 1024,
        size: 0
      }
      this.store = store;
    } else {
      this.store = JSON.parse(store);
    }
  }

  set(key, value, expire) {
    this.store[key] = {
      date: Date.now(),
      expire,
      value
    }
    let size = this.sizeOf(JSON.stringify(this.store[key]));
    if (this.store.maxSize < size + this.store.size) {
      console.log('超了');
      var keys = Object.keys(this.store);
      // 时间排序
      keys = keys.sort((a, b) => {
        let item1 = this.store[a], item2 = this.store[b];
        return item2.date - item1.date;
      });
      while (size + this.store.size > this.store.maxSize) {
        let index = keys[keys.length -1];
        this.store.size -= this.sizeOf(JSON.stringify(this.store[index]));
        delete this.store[index];
      }
    }
    this.store.size += size;
    localStorage.setItem('cache', Json.stringify(this.store));
  }

  get(key) {
    let d = this.store[key];
    if (!d) {
      console.log('找不到该属性');
      return;
    }
    if (d.expire > Date.now) {
      console.log('过期删除');
      delete this.store[key];
      localStorage.setItem('cache', Json.stringify(this.store));
    } else {
      return d.value
    }
  }

  sizeOf(str, charset) {
    var total = 0, charCode, i, len;
    charset = charset ? charset.toLowerCase() : '';
    if (charset === 'utf-16' || charset === 'utf16') {
      for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode <= 0xffff) { // 0xffff 代表-1
          total += 2;
        } else {
          total += 4;
        }
      }
    } else { // utf-8 的标识
      for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode <= 0x007f) {
          total += 1;
        } else if (charCode <= 0x07ff) {
          total += 2;
        } else if (charCode <= 0xffff) {
          total += 3;
        } else {
          total += 4;
        }
      }
    }

    return total;
  }
}


class Store {
  constructor() {
    let store = localStorage.getItem('cache')
    if (!store) {
      store = {
        maxSize: 1024 * 1024,
        size: 0
      }
      this.store = store
    } else {
      this.store = JSON.parse(store)
    }
  }
  set(key, value, expire) {
    this.store[key] = {
      date: Date.now(),
      expire,
      value
    }
    let size = this.sizeOf(JSON.stringify(this.store[key]))
    if (this.store.maxSize < size + this.store.size) {
      console.log('超了-----------');
      var keys = Object.keys(this.store);
      // 时间排序
      keys = keys.sort((a, b) => {
        let item1 = this.store[a], item2 = this.store[b];
        return item2.date - item1.date;
      });
      while (size + this.store.size > this.store.maxSize) {
        let index = keys[keys.length - 1]
        this.store.size -= this.sizeOf(JSON.stringify(this.store[index]))
        delete this.store[index]
      }
    }
    this.store.size += size

    localStorage.setItem('cache', JSON.stringify(this.store))
  }
  get(key) {
    let d = this.store[key]
    if (!d) {
      console.log('找不到该属性');
      return
    }
    if (d.expire > Date.now) {
      console.log('过期删除');
      delete this.store[key]
      localStorage.setItem('cache', JSON.stringify(this.store))
    } else {
      return d.value
    }
  }
  sizeOf(str, charset) {
    var total = 0,
      charCode,
      i,
      len;
    charset = charset ? charset.toLowerCase() : '';
    if (charset === 'utf-16' || charset === 'utf16') {
      for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode <= 0xffff) {
          total += 2;
        } else {
          total += 4;
        }
      }
    } else {
      for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode <= 0x007f) {
          total += 1;
        } else if (charCode <= 0x07ff) {
          total += 2;
        } else if (charCode <= 0xffff) {
          total += 3;
        } else {
          total += 4;
        }
      }
    }
    return total;
  }
}


/** 
 *  详细说明 Event loop
 */

 /** 1. js是门非阻塞单线程语言。如果js是门多线程的语言，我们在多线程中处理DOM就可能会发生问题（一个线程中新增节点，另一个线程中
  *  删除节点），当然可以引入读写锁解决这个问题。
  *  2. js在执行的过程中会产生执行环境，这些执行环境会被顺序的加入到执行栈中。如果遇到异步的代码，会被挂起并加入到task（有多种task）队列中。
  *  一旦执行栈为空，Event Loop就会从Task队列中拿出需要执行的代码并放入执行栈中执行。所以本质上来说js中的异步还是同步行为。
  *  3. 不同的任务源会被分配到不同的task队列中，任务源可以分为微任务（microtask）和宏任务（macrotask）。在es6规范中，microtask称为jobs，
  *  macrotask称为task。 */

/**  1. 以上代码虽然setTimeout写在Promise之前，但是因为Promise属于微任务而setTimeout 属于宏任务，所以先Promise后setTimeout。
 *   2. 微任务包括promise.nextTick, promise, Object.observe, MutationObserver;
 *   3. 宏任务包括script, setTimeout, setInterval, setImmediate, I/O, UI rendering.
 *   4. 很多人认为微任务快于宏任务，其实不对。因为宏任务包括script，浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务。
 */

/** 所以真确的一次Event loop顺序是这样的
 *  1. 执行同步代码，这属于宏任务；
 *  2. 执行栈为空，查询是否有微任务需要执行；
 *  3. 执行所有微任务；
 *  4. 必要的话渲染UI
 *  5. 然后开始下一轮Event loop, 执行宏任务中的异步代码。
 */

