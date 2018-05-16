/** 方法一： 双层循环（最原始方法） */
var array1 = [1, 1, '1', '1'];
function unique1(arr) {
  var res = [];
  for (var i = 0, arrLen = arr.length; i < arrLen; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (arr[i] === res[j]) {
        break;
      }
    }
    // 如果arr[i]是唯一的，那么执行完循环，j等于resLen
    if (j == resLen) {
      res.push(arr[i]);
    }
  }
  return res;
}
console.log(unique1(array1));

/** 方法二：indexOf */
function unique2(arr) {
  var res = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var current = arr[i];
    if (res.indexOf(current) === -1) {
      res.push(current);
    }
  }
  return res;
}
console.log(unique2(array1));

/** 方法三： 排序后去重（试想我们先将要去重的数组使用 sort 方法排序后，
 *  相同的值就会被排在一起，然后我们就可以只判断当前元素与上一个元素是否相同，相同就说明重复，不相同就添加进 res，让我们写个 demo：） 
 *  如果我们对一个已经排好序的数组去重，这种方法效率肯定高于使用 indexOf。*/
function unique3(arr) {
  var res = [];
  var sortedArray = arr.concat().sort();
  var seen;
  for (var i = 0, arrLen = sortedArray.length; i < arrLen; i ++) {
    // 如果是第一个元素或者相邻的元素不相同
    if (!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i]);
    }
    seen = sortedArray[i];
  }
  return res;
}
console.log(unique3(array1));

/** 方法四：unique API
 *  知道了这两种方法后，我们可以去尝试写一个名为 unique 的工具函数，我们根据一个参数 isSorted 判断传入的数组是否是已排序的，
 *  如果为 true，我们就判断相邻元素是否相同，如果为 false，我们就使用 indexOf 进行判断。
 */
var array11 = [1, 2, '1', 2, 1];
var array22 = [1, 1, '1', 2, 2];

// API 第一版
function unique11(arr, isSorted) {
  var res = [];
  var seen;
  for (var i = 0, arrLen = arr.length; i < arrLen; i++) {
    if (isSorted) {
      if (!i || seen !== arr[i]) {
        res.push(arr[i]);
      }
      seen = arr[i];
    } else {
      if (res.indexOf(arr[i]) === -1) {
        res.push(arr[i]);
      }
    }
  }
  return res;
}
console.log(unique11(array11)); // [1, 2, "1"]
console.log(unique11(array22, true)); // [1, "1", 2]

/** 优化：让API功能更强大。 新需求：字母的大小写视为一致，比如'a'和'A'，保留一个就可以了！
 *  虽然我们可以先处理数组中的所有数据，比如将所有的字母转成小写，然后再传入unique函数，
 *  但是有没有方法可以省掉处理数组的这一遍循环，直接就在去重的循环中做呢？让我们去完成这个需求：
 */
var array13 = [1, 1, 'a', 'A', 2, 2];

// iteratee 英文释义：迭代，重复
function unique13(array, isSorted, iteratee) {
  var res = [];
  var seen = [];

  for (var i = 0, arrLen = array.length; i < arrLen; i++) {
    var value = array[i];
    var computed = iteratee ? iteratee(value, i, array) : value;
    if (isSorted) {
      if (!i || seen !== computed) {
        res.push(value);
      }
      seen = computed;
    } else if (iteratee) {
      if (seen.indexOf(computed) === -1) {
        res.push(value);
        seen.push(computed);
      }
    } else if (res.indexOf(value) === -1) {
      res.push(value);
    }
  }

  return res;
}
console.log(unique13(array13, false, function(item) {
  return typeof item == 'string' ? item.toLowerCase() : item;
}));

/** 第五钟方法： filter */
function unique5(arr) {
  var res = arr.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
  return res;
}

/** TODO: 不是很懂： 第六种方法：排序去重的方法 */
function unique6(arr) {
  return arr.concat().sort().filter(function(item, index, array) {
    return !index || item !== array[index -1];
  })
}
console.log(unique6(array1));

/** 第七种方法： Object键值对 */
function unique7(array) {
  var obj = {};
  return array.filter(function(item, index, array){
    console.log(obj)
    return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
  })
}
console.log(unique7(array1));

// 方法7的优化： 然而，即便如此，我们依然无法正确区分出两个对象，比如 {value: 1} 和 {value: 2}，
// 因为 typeof item + item 的结果都会是 object[object Object]，不过我们可以使用 JSON.stringify 将对象序列化：
function unique71(array) {
  var obj = {};
  return array.filter(function(item, index, array) {
    console.log(typeof item + JSON.stringify(item))
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)]  = true)
  })
}
console.log(unique71([{value: 1}, {value: 1}, {value: 2}]));

/** 方法八：ES6 */
function unique8(array) {
  return Array.from(new Set(array));
}

// 简化版
function unique81(array) {
  return [...new Set(array)];
}

// map 版
function unique82(array) {
  const seen = new Map();
  console.log(seen)
  return array.filter(a => !seen.has(a) && seen.set(a, 1))
}
console.log(unique82([{value: 1}, {value: 1}, {value: 2}]));