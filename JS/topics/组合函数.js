
/** pointfree 指的是函数无须替吉将要操作的数据是什么样的。
 *  需求：输入 'kevin'，返回 'HELLO, KEVIN'。
 */

// 非pointfree，因为提到了数据：name
var greet_demo = function (name) {
  return ('hello ' + name).toUpperCase();
}

function compose_demo(f, g) {
  return function (x) {
    return f(g(x));
  }
}

function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  }
}

// pointfree
// 先定义基本运算，这些可以封装起来复用
var toUpperCase = function (x) { return x.toUpperCase() };
var hello = function (x) { return 'HELLO, ' + x };

var greet = compose(hello, toUpperCase);
console.log(greet('kevin'));


/** 需求二：输入 'kevin daisy kelly'，返回 'K.D.K' */
// 非pointfree, 因为提到了数据：name
var initials_demo = function (name) {
  return name.split(' ').map(compose(toUpperCase, head)).join('. ');
};

// pointfree
// 先定义基本运算
var data = {
  result: "SUCCESS",
  tasks: [
    {
      id: 104, complete: false, priority: "high",
      dueDate: "2013-11-29", username: "Scott",
      title: "Do something", created: "9/22/2013"
    },
    {
      id: 105, complete: false, priority: "medium",
      dueDate: "2013-11-22", username: "Lena",
      title: "Do something else", created: "9/22/2013"
    },
    {
      id: 107, complete: true, priority: "high",
      dueDate: "2013-11-22", username: "Mike",
      title: "Fix the foo", created: "9/22/2013"
    },
    {
      id: 108, complete: false, priority: "low",
      dueDate: "2013-11-15", username: "Punam",
      title: "Adjust the bar", created: "9/25/2013"
    },
    {
      id: 110, complete: false, priority: "medium",
      dueDate: "2013-11-15", username: "Scott",
      title: "Rename everything", created: "10/2/2013"
    },
    {
      id: 112, complete: true, priority: "high",
      dueDate: "2013-11-27", username: "Lena",
      title: "Alter all quuxes", created: "10/5/2013"
    }
  ]
};

// 第一版 过程式编程
var fetchData = function() {
  // 模拟
  return Promise.resolve(data);
};

var getIncompleteTaskSummaries = function(membername) {
  return fetchData()
    .then(function(data) {
      return data.tasks;
    })
    .then(function(tasks) {
      return tasks.filter(function(task) {
        return task.username == membername;
      })
    })
    .then(function(task) {
      console.log('task', task);
    })
}

// getIncompleteTaskSummaries('Scott');

// 第二版 pointfree 改写
var prop = curry6(function(name, obj) {
  return obj[name];
});

var propEq = curry6(function(name, val, obj) {
  return obj[name] === val;
});

var filter = curry6(function(fn, arr) {
  return arr.filter(fn);
});

var map = curry6(function(args, obj) {
  return arr.map(fn);
});

var pick = curry6(function(args, obj) {
  var result = {};
  for (var i = 0; i < args.length; i++) {
    result[args[i]] = obj[args[i]]
  }
  return result;
});

var sortBy = curry6(function(fn, arr) {
  return arr.sort(function(a, b) {
    var a = fn(a),
        b = fn(b);
    return a < b ? -1 : a > b ? 1 : 0; // 0 代表 a = b
  })
});

var getIncompleteTaskSummaries2 = function(membername) {
  return fetchData()
    .then(prop('tasks'))
    .then(filter(propEq('username', membername)))
    .then(filter(propEq('complete', false)))
    .then(data => console.log(22222, data));
}

getIncompleteTaskSummaries2('Scott')
