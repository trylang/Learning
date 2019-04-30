
import { Observable,
  filter,
  of,
  map,
  delay,
  fromEvent } from './main.js';
//  第一个例子 of 将字符转化成流
const haha = Observable.of(1,2,3).map(x => {
  return x + '!!!';
});
haha.subscribe(item => {
  console.log(item);
})
console.log(haha);

// 第二个例子， 内部产生新事件
const haha1 = new Observable.create(observer => {
  observer.next('foo');
  setTimeout(() => observer.next('bar'), 500);
});

haha1.subscribe(value => console.log(value));

// 控制流动
var input1 = new Observable.fromEvent(document.querySelector('input'), 'input');

// input1
//      .filter(event => event.target.value.length >2)
//      .map(event => event.target.value)
//      .subscribe(value => console.log(value)); 

// // 延迟事件
// input1.delay(6000)
//   .map(event => event.target.value)
//   .subscribe(value => {
//     console.log(value)
//   });

// // 每2000ms只能通过一个事件
// input1.throttleTime(2000)
//   .map(event => event.target.value)
//   .subscribe(value => console.log(value)); // "h" -200ms-> "w"

// // 停止输入后2000ms方能通过最新的那个事件
// input1.debounceTime(2000)
//   .map(event => event.target.value)
//   .subscribe(value => console.log(value)); // "o" -200ms-> "d"

// // 在3次事件后停止事件流
// input1.take(3)
//   .map(event => event.target.value)
//   .subscribe(value => console.log(value)); // "hel"


// 直到其他 observable 触发事件才停止事件流
var stopStream = new Observable.fromEvent(document.querySelector('button'), 'click');
input1.takeUntil(stopStream)
      .map(event => event.target.value)
      .subscribe(value => console.log(value));

