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
function defineReactive(data, key, value) {
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(val) {
      value = val;
      console.log('被我监听啦', val);
    }
  })
}

// 需要遍历每层属性并赋值
function observe(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  for (let key in data) {
    defineReactive(data, key, data[key]);
  }
};

// 2. 实现一个容纳订阅者的消息订阅器Dep，订阅器Dep主要负责收集订阅者，如果属性变化则再执行对应订阅者的更新函数，所以订阅器需要有一个容器，


var library = {
  book1: {
    name: ''
  },
  book2: ''
};

observe(library); // 监听
library.book1.name = '是我';
library.book2 = '没有这本书';

console.log(library.book1.name);
console.log(library.book2);