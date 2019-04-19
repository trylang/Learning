import { Observable} from 'rxjs/Observable';
import filter from 'rxjs/add/operator/filter';
import of from 'rxjs/add/observable/of';
import map from 'rxjs/add/operator/map';
import delay from 'rxjs/add/operator/delay';
import throttleTime from 'rxjs/add/operator/throttleTime';
import debounceTime from 'rxjs/add/operator/debounceTime';
import take from 'rxjs/add/operator/take';
import takeUntil from 'rxjs/add/operator/takeUntil';
import pluck from 'rxjs/add/operator/pluck';
import pairwise from 'rxjs/add/operator/pairwise';
import distinct from 'rxjs/add/operator/distinct';
import distinctUntilChanged from 'rxjs/add/operator/distinctUntilChanged';
import scan from 'rxjs/add/operator/scan';
import { merge } from 'rxjs/operators'


import fromEvent from 'rxjs/add/observable/fromEvent';

export {
  Observable,
  filter,
  of,
  map,
  delay,
  throttleTime,
  debounceTime,
  take,
  takeUntil,
  pluck,
  pairwise,
  distinct,
  distinctUntilChanged,
  scan,
  merge,

  fromEvent
};