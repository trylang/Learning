/**
 *  实现findIndex与findLastIndex函数：createIndnexFinder
 *  然而问题在于，findIndex 和 findLastIndex 其实有很多重复的部分，如何精简冗余的内容呢？这便是我们要学习的地方，日后面试问到此类问题，也是加分的选项。
 *  underscore 的思路就是利用传参的不同，返回不同的函数。这个自然是简单，但是如何根据参数的不同，在同一个循环中，实现正序和倒序遍历呢？
 */
function createIndexFinder(dir) {
  return function (array, predicate, context) {
    var length = array.length;
    var index = dir > 0 ? 0 : array.length - 1;

    for (; index >= 0 && index < length; index += dir) {
      if (predicate.call(context, arr[index], index, array)) return index;
    }

    return -1;
  }
}

var findIndex = createIndexFinder(1);
var findLastIndex = createIndexFinder(-1);

function isBigEnough(element) {
  return element >= 15;
}
console.log([12, 5, 8, 130, 44].findIndex(isBigEnough));  // 3


/** sortedIndex: 又来了一个新需求：在一个排好序的数组中找到 value 对应的位置，保证插入数组后，依然保持有序的状态。
 *  对于有序得数组，使用二分法查找法
 */

// 第一版
function sortedIndex1 (array, obj) {
  var low = 0, high = array.length;
  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    if (array[mid] < obj) low = mid +1;
    else high = mid;
  }
  return high;
};
console.log(sortedIndex1([10, 20, 30, 40, 50], 35));


// 所以我们还需要再加上一个参数 iteratee 函数对数组的每一个元素进行处理，
// 一般这个时候，还会涉及到 this 指向的问题，所以我们再传一个 context 来让我们可以指定 this，那么这样一个函数又该如何写呢？

// 第二版
function cb(func, context) {
  // void其实是javascript中的一个函数，接受一个参数，返回值永远是undefined。可以说，使用void目的就是为了得到javascript中的undefined。
  if (context === void 0) return func;
  return function() {
    return func.apply(context, arguments);
  };
}

function sortedIndex2(array, obj, iteratee, context) {
  iteratee = cb(iteratee, context);
  
  var low = 0, high = array.length;
  while (low < high) {
    var mid = Math.floor((low + high) /2);
    if (iteratee(array[mid]) < iteratee(obj)) low = mid + 1;
    else high = mid;
  }
  return high;
};

// stooges 配角 比如 三个臭皮匠 The Three Stooges
var stooges = [{name: 'stooge1', age: 10}, {name: 'stooge2', age: 30}];

var result = sortedIndex2(stooges,  {name: 'stooge3', age: 20}, function(stooge) {
  return stooge.age;
});

console.log('result', result);


/** indexOf 类似findLastIndex得方式. predicate:断言，表明 */
// 第一版
function createIndexOfFinder(dir, predicate, sortedIndex) {
  return function(array, item, idx) {
    var length = array.length;
    var i = 0;

    if (typeof idx == 'number') {
      if (dir > 0) {
        i = idx >= 0? idx : Math.max(length + idx, 0);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    }

    else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item);
      // 如果该插入得位置得值正好等于元素得值，说明是第一个符合要求得值
      return array[idx] === item ? idx : -1;
    }
    
    // 判断元素是否是NaN
    if (item !== item) {
      // 在截取好得数组中查找第一个满足isNaN函数得元素得下标
      idx = predicate(array.slice(i, length), isNaN)
      return idx >= 0 ? idx + i : -1;
    }

    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }
    return -1;
  }
}

var indexOf = createIndexOfFinder(1, findIndex);
var lastIndexOf = createIndexOfFinder(-1, findLastIndex);

var resultIndex = indexOf([1, NaN, 2, 3, 4, 5], 2);
console.log('resultIndex', resultIndex);

