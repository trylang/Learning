// promise 只考虑同步，异步的情况
function Promise(func) {
  var value,
    callbacks = [],
    state = "pending";

  // then 方法用于注册执行函数，放入执行函数数组callbacks中，等到异步执行完resolve函数执行时，改变状态为fulfilled，then方法执行
  this.then = function(fn) {
    if (state == "pending") {
      callbacks.push(fn);
    }
    if (state == "fulfilled") {
      // 这里是要解决resolve函数同步代码执行的情况，需要立即执行
      fn(value);
    }
    return this;
  };

  function resolve(newValue) {
    value = newValue;
    state = "fulfilled";
    setTimeout(() => {
      // 防止resolve函数置于同步环境中，如此还没有then方法注册完，resolve函数就执行完了，所以需要置于异步函数中最后执行
      console.log(1);
      console.log(callbacks);
      callbacks.forEach(callback => {
        // 如果resolve是同步函数，callbacks数组就是空，不会执行
        callback(value);
      });
    }, 0);
  }
  // promise传参是两个函数（resolve，reject），启动函数，同步
  func(resolve);
}

// promise考虑链式调用仍是promise的情况， func函数包含（resolve， reject两个函数名，用于异步执行成功或失败后的回调）
function Promise2(func) {
  // 初始化 --- 值，回调数组，状态
  var value,
    callbacks = [],
    state = "pending";

  // promise类上的then方法,用于注册回调函数
  this.then = function(fn) {
    return new Promise(function(resolve) {
      handle({
        fn: fn || null,
        resolve: resolve
      });
    });
  };

  function handle(callback) {
    if (state === "pending") {
      callbacks.push(callback);
      return;
    }
    //如果then中没有传递任何东西
    if (!callback.fn) {
      callback.resolve(value);
      return;
    }

    // state == fulfilled状态就执行
    var ret = callback.fn(value);
    console.log('ret', ret);
    callback.resolve(ret);
  }
  // this.then = function(fn) {

  //   // if (state == 'pending') { // resolve异步执行时处于pending状态，要存储到数组中集中执行
  //   //   callbacks.push(fn);
  //   // }
  //   // if(state == 'fulfilled') { // resolve同步执行时，会直接处于fulfilled状态，这时需要直接执行
  //   //   fn(value);
  //   // }
  //   // return this;
  // }

  // 成功回调方法,拿到了我们业务代码的数据,这是要状态改变为fulfilled,执行resolve时then方法必须注册完成，这时就需要使用setTimeout置于末尾执行
  var resolve = function(newValue) {
    
    if (newValue instanceof Promise2) {
      // 如果 newValue 是个 Promise，递归执行
      return newValue.then(resolve)
    }

    value = newValue;
    state = "fulfilled";
    setTimeout(() => {
      console.log("vfvfvf", callbacks);
      callbacks.forEach(callback => {
        // callback(value);
        handle(callback);
      });
    }, 0);
  };

  // 立即执行函数，执行我们写的异步异步或同步逻辑
  func(resolve);
}


function getUserId() {
  return new Promise2(function(resolve) {
    // resolve(12343343);
    // return;
    setTimeout(() => {
      resolve(123743);
      console.log(2);
    }, 0);
  });
}

getUserId()
  .then(value => {
    console.log(value);
    return 456;
  })
  .then(value => {
    return new Promise2(function(resolve) {
      setTimeout(function() {
        resolve(98753);
        console.log(3);
      }, 0);
    });
  })
  .then(job => {
    console.log('job', job)
  });
