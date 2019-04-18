
import { Observable } from './main.js';
var input = new Observable.fromEvent(document.querySelector('input'), 'input');

// 传递一个新的值
input.map(event => event.target.value)
     .subscribe(value => console.log(value));

// 通过提取属性传递一个新的值
input.pluck('target', 'value')
  .subscribe(value => console.log(value)); // "h"

// 传递之前的两个值
input.pluck('target', 'value').pairwise()
  .subscribe(value => console.log('pairwise', value)); // ["h", "he"]

// 只会通过唯一的值
input.pluck('data').distinct()
  .subscribe(value => console.log('distinct', value)); // "helo wrd"

// 不会传递重复的值
input.pluck('data').distinctUntilChanged()
  .subscribe(value => console.log('distinctUntilChanged', value)); // "helo world"


  /**
   *  创建应用
   */
  var button = document.querySelector('button');
  new Observable.fromEvent(button, 'click')
                // 对流进行scan（reduce）操作，
                .scan(count => count + 1, 0)
                .subscribe(count => document.querySelector('#count').innerHTML = count);