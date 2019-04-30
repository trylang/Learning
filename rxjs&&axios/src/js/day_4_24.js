var Rx = require('rxjs/Rx');

let clickCount = 0;
const event$ = Rx.Observable.fromEvent(document.querySelector('#clickMe'), 'click');
const countDown$ = Rx.Observable.timer(5000);
const filtered$ = event$.takeUntil(countDown$);

const showEnd = () => {
  document.querySelector('#end').innerHTML = '时间结束';
}
const updateCount = () => {
  document.querySelector('#text').innerHTML = ++clickCount;
}

countDown$.subscribe(showEnd);
filtered$.subscribe(updateCount);