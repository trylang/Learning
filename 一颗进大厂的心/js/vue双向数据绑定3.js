
// 监听容器
function Dep() {
  this.subs = [];
};

Dep.prototype = {
  add(sub) {
    this.subs.push(sub);
  },
  notify() { // 触发函数
    console.log('notify', this.subs)
    this.subs.forEach(sub => {
      sub.update();
    })
  }
};

// 对于属性的监听
function observe(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  for (let key in data) {
    reactObserve(data, key, data[key]);
  }
};

function reactObserve(data, key, value) {
  observe(value);
  var dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      // 这时要初始化，是否要添加进watcher，使用Dep.target来监听
      if (Dep.target) {
        dep.add(Dep.target);
      }
     return value; 
    },
    set(newValue) {
      if (value == newValue) {
        return;
      }
      value = newValue;
      // 触发监听，每个watcher的cb都要触发一遍
      dep.notify();
      
    }
    
  })
};

function Water (vm, exp, cb) {
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  // 最最重要的是value
  this.value = this.get(); // 将自己添加到订阅器的操作
};

Water.prototype = {
  update: function() {
    this.run();
  },
  run: function() {
    var value = this.vm.data[this.exp];
    var oldVal = this.value;
    if (value != oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  get: function() {
    debugger
    Dep.target = this;
    var value = this.vm.data[this.exp]; // 已经将target监听到了get里
    Dep.target = null;
    return value;
  }
};

function SelfVue (data, el, exp) {
  // 获取data;
  this.data = data;
  observe(data);
  console.log(data);
  // ele页面数据显示
  ele.innerHTML = data[exp];
  // water 监听
  debugger
  new Water(this, exp, function(val) {
    // val 为最新数据
    ele.innerHTML = val;
  });
  // return this;
};



// 捋捋思路
// 1. 属性监听 Object.defineProperty();
// 2. 监听容器（Dep，两个方法，添加和触发）
// 3. 初始化newVue方法，参数有（data, ele, '传入要双向绑定的名称'），newVue方法要调用两个函数（observe()和watcher()）;
// 4. watcher函数，参数（data, exp, cb），初始化value = this.get(); 也就是要加到监听容器里，监听容器参数是water的整个返回，Dep.target = this;
//    wather的update函数也就是会调用run函数，run函数做的事情就是 1. 赋值新值（当然是.赋值法，以为这时已经通过Observe的set方法转变值了）；2. 这时要执行water的回调函数cb;
// 5. observe方法注意点，get方法时要判断是否有Dep.target，有才需要添加到监听容器里，dep.add(Dep.target);
//    set方法需要触发dep.notify方法，notify方法是要触发wather的update函数，进而执行cb回调


// test
var ele = document.querySelector('#name');
var selfVue = new SelfVue({
  name: 'heihie It\'s me !'
}, ele, 'name');

setTimeout(function() {
  selfVue.data.name = '我要改变啦';
}, 1000);