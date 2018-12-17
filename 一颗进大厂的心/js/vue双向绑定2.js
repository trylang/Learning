var Book = {}, name12 = '';
Object.defineProperty(Book, 'name1', {
  get() {
    return name12 + '   hahahaha';
  },
  set(val) {
    // debugger
    name12 = val;
  }
});

Book.name1 = 'vue';
console.log(Book.name1);



// ===============================  

// 1. 实现一个Observer
function observe(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  for (let key in data) {
    defineReactive(data, key, data[key]);
  }
};

// 需要遍历每层属性并赋值
function defineReactive(data, key, value) {
  observe(value);
  var dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) { // 判断是否需要添加订阅者
        dep.addSub(Dep.target); // 在这里添加一个订阅者
      }
      return value;
    },
    set(newVal) {
      if(value === newVal) {
        return;
      }
      value = newVal;
      dep.notify(); // 如果数据变化，通知所有订阅者
      console.log('被我监听啦', newVal);
    }
  })
}

// 2. 订阅者的消息订阅器Dep,订阅器Dep主要负责收集订阅者，然后再属性变化的时候执行对应订阅者的更新函数。所以显然订阅器需要有一个容器，这个容器就是list，将上面的Observer稍微改造下，植入消息订阅器：
// 将订阅器Dep添加一个订阅者设计在getter里面，这是为了让Watcher初始化进行触发，因此需要判断是否要添加订阅者，至于具体设计方案，下文会详细说明的。在setter函数里面，如果数据变化，就会去通知所有订阅者，订阅者们就会去执行对应的更新的函数。到此为止，一个比较完整Observer已经实现了，接下来我们开始设计Watcher。
function Dep () {
  this.subs = [];
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },
  notify: function () {
    this.subs.forEach(sub => {
      sub.update();
    })
  }
}

// 3. water 
// 订阅者Watcher在初始化的时候需要将自己添加进订阅器Dep中，那该如何添加呢？我们已经知道监听器Observer是在get函数执行了添加订阅者Wather的操作的，所以我们只要在订阅者Watcher初始化的时候出发对应的get函数去执行添加订阅者操作即可，那要如何触发get的函数，再简单不过了，只要获取对应的属性值就可以触发了，核心原因就是因为我们使用了Object.defineProperty( )进行数据监听。这里还有一个细节点需要处理，我们只要在订阅者Watcher初始化的时候才需要添加订阅者，所以需要做一个判断操作，因此可以在订阅器上做一下手脚：在Dep.target上缓存下订阅者，添加成功后再将其去掉就可以了。订阅者Watcher的实现如下：

function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  debugger
  this.value = this.get(); // 将自己添加到订阅器的操作
}

Watcher.prototype = {
  update: function() {
    this.run();
  },
  run: function() {
    var value = this.vm.data[this.exp];
    var oldVal = this.value;
    debugger;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  get: function() {
    debugger;
    Dep.target = this; // 缓存自己
    var value = this.vm.data[this.exp]; // 强制执行监听器里的get函数
    Dep.target = null; // 释放自己
    return value;
  }
}

var library = {
  book1: {
    name: ''
  },
  book2: ''
};

// observe(library); // 监听
// library.book1.name = '是我';
// library.book2 = '没有这本书';

// console.log(library.book1.name);
// console.log(library.book2);

function SelfVue(data, el, exp) {
  this.data = data;
  observe(data);
  console.log(332, data);
  debugger
  el.innerHTML = this.data[exp]; // 初始化模板数据的值
  new Watcher(this, exp, function(val) {
    el.innerHTML = val;
  });
  return this;
}

// 测试
var ele = document.querySelector('#name');
var selfVue = new SelfVue({
  name: 'hello world'
}, ele, 'name');

window.setTimeout(function() {
  console.log('name值要变了哈');
  selfVue.data.name = 'canfoo';
}, 1000);