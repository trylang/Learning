/** 
 * 状态和存储
 *
 */

import { Observable, pipe, map, fromEvent } from './main';

import * as Rx from 'rxjs/Rx';
// var button = document.querySelector('button');
// var increase = new Observable.fromEvent(button, 'click')
//   .map(() => {
//     return (state) => Object.assign({}, state, {count: state.count + 1});
//   });

// // 我们使用初始状态创建了一个对象。每当状态发生变化时，我们会接收到改变状态的函数，
// // 并把状态传递给它。然后返回新的状态并准备在下次点击后再次更改状态。
// var state = increase.scan((state, changeFn) => changeFn(state), {count: 0});

// // 现在我们还可以再添加几个 observables ，它们同样也可以更改同一个状态存储。

var increaseButton = document.querySelector('#increase');
debugger
var increase = Rx.Observable.fromEvent(increaseButton, 'click')
    .map(() => {
      return state => {
        return Object.assign({}, state, { count: state.count + 1});
      }
    });

var decreaseButton = document.querySelector('decrease');
var decrease = Rx.Observable.fromEvent(decreaseButton, 'click')
    .map(() => state => Object.assign({}, state, {count: state.count - 1}));


var inputElement = document.querySelector('#input');
// 将按键事件映射成一个函数，它会产生一个叫做inputValue状态
var input = Rx.Observable.fromEvent(inputElement, 'keypress')
    .map(event => state => Object.assign({}, state, {inputValue: event.target.value}));


// 我们将这三个改变状态的observable进行合并
var state = Rx.Observable.merge(
  increase,
  decrease,
  input
).scan((state, changeFn) => changeFn(state), {
  count: 0,
  inputValue: ''
});

// 我们订阅状态的变化并跟新dom
state.subscribe(state => {
  document.querySelector('#count').innerHTML = state.count;
  document.querySelector('#hello').innerHTML = state.inputValue;
});
