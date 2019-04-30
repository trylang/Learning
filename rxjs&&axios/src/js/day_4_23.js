var Rx = require('rxjs/Rx');

const result$ = Rx.Observable.interval( 0).take(3);
const ho$ = result$.map(x => {
  // console.log(2121, x);
  return Rx.Observable.interval( 0).map(y => {
    // console.log(333, x, y);
    return  x + ': ' + y;
  }).take(3);
});

console.log(ho$);
const concated$ = ho$.exhaust();
console.log(concated$);

concated$.subscribe(val => console.log(val));


// 辅助类操作符
const intial$ = Rx.Observable.of({name: 'rxjs', year: 2011}, {name: 'react', year: 2013},{name: 'redux', year: 2015});
const min$ = intial$.min((a, b) => a.year - b.year).subscribe(val => console.log(val));

Rx.Observable.prototype.average = function() {
  return this.reduce(
    (acc, current) => {
      console.log(acc, current);
      return {sum: acc.sum+current, count: acc.count+ 1}
    },
    {sum: 0, count: 0}
  ).map(acc => {
    return acc.sum / acc.count;
  });
}

const average$ = Rx.Observable.of(1,2,3).average().subscribe(val => console.log('average', val));

// 尝试empty
const interval$ = Rx.Observable.interval(1000); // false
const isEmpty1$ = interval$.isEmpty();
isEmpty1$.subscribe(val => console.log(4223, val))
const interval2$ = Rx.Observable.empty().isEmpty().subscribe(val => console.log('isempty', val)); // true
const interval3$ = Rx.Observable.never().isEmpty().subscribe(val => console.log('never', val));
const interval4$ = Rx.Observable.of(0).isEmpty().subscribe(val => console.log('interval4', val)); // false

const asyncInterval$ = Rx.Observable.create(observable => {
  setTimeout(() => observable.complete(1), 2000);
});
const asyncIntervalIsEmpty$ = asyncInterval$.isEmpty().subscribe(val => console.log('asyncIntervalIsEmpty', val));


