/**
 *  介绍： 1. 发布 & 订阅； 2. 一对多；
 *  场景：1. 网页事件绑定；2.Promise； 3.jQuery callbacks; 4.nodejs自定义事件
 */

// // 例子-- 观察者： 
// Observer {
//   name: String,
//   subject: subject,
//   update()
// }

// // 主题 -- 可以有多个观察者观察它
// Subject {
//   observers: Array,
//   state: init,

//   getState(): init,
//   setState(state),
//   attach(observer), // 添加观察者
//   notifyAllObservers() // 通知所有的观察者
// }

class Subject {
  constructor(state) {
    this.state = state;
    this.observers = [];
  }

  getState() {
    return this.state;
  }
  setState(state) {
    console.log(state);
    this.state = state;
    this.notifyAllObservers();
  }
  attach(observer) {
    this.observers.push(observer);
  }
  notifyAllObservers() {
    this.observers.forEach(observer => {
      observer.update();
    })
  }
}

class Observer {
  constructor (name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.attach(this);
  }
  update() {
    console.log(`${this.name}观察着： ${this.subject.state}主题`);
  }
}

// 测试
let subject = new Subject();
let o1 = new Observer('o1', subject);
let o2 = new Observer('o2', subject);
let o3 = new Observer('o3', subject);

subject.setState(1);
subject.setState(2);
subject.setState(3);


// node
const EventEmitter = require('event').EventEmitter;

//继承
class Dog extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
  }
}

let simon = new Dog('simon');
simon.on('bark', () => {
  console.log('simon')
})

simon.on('bark', () => {
  console.log('simon2')
})

simon.emit('bark')