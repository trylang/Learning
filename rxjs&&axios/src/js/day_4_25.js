import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/throttle';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/auditTime';

import 'rxjs/add/operator/distinct';

// throttle（节流） 和 debounce（防抖）

// 1. 基于时间控制流量： throttleTime 和 debounceTime

const source$ = Observable.interval(1000).take(5);
const result$ = source$.debounceTime(1500);

// result$.subscribe(val => console.log(val));


const source1$ = Observable.interval(500).take(2).mapTo('A')
                  .concat(Observable.interval(1000).take(3).mapTo('B'))
                  .concat(Observable.interval(500).take(3).mapTo('C'));
const result1$ = source1$.auditTime(800);
result1$.subscribe(val => console.log(val));



// 用数据流来控制流量
const durationSelector = value => {
  console.log(`# call duration with ${value}`);
  const data = Observable.timer(value % 3 === 0 ? 2000 : 1000);
  data.subscribe(cal => console.log(`frfrr--- ${cal}`));
  return data;
}
const result2$ = source$.debounce(durationSelector);

// result2$.subscribe(val => console.log(val));


const source2$ = Observable.interval(100).map(x => x %1000);
// source2$.subscribe(val => console.log(val));
const distinct$ = source2$.distinct(null, Observable.interval(500));
// distinct$.subscribe(val => console.log('val' + val));
