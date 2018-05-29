/** 数组的扁平化，就是将一个嵌套多层的数组 array (嵌套可以是任何层数)转换为只有一层的数组。 */

/** 递归：循环数组元素 */

// 方法一
var arr = [1, [2, [3, 4]]];

function flatten1(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten1(arr[i]));
    }
    else {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log(flatten1(arr));

/** toStirng
 * 如果数组的元素都是数字，那么我们可以考虑使用 toString 方法，因为：
   [1, [2, [3, 4]]].toString() // "1,2,3,4"
   调用 toString 方法，返回了一个逗号分隔的扁平的字符串，这时候我们再 split，然后转成数字不就可以实现扁平化了吗？
 */

 function flatten2(arr) {
   console.log(arr.toString().split(','))
   return arr.toString().split(',').map(function(item) {
     return +item;
   })
 }

 console.log(flatten2(arr));

 /** reduce
  *  既然是对数组进行处理，最终返回一个值，我们就可以考虑使用 reduce 来简化代码：
  */

function flatten3(arr) {
  return arr.reduce(function(prev, next) {
    console.log('prev', prev);
    console.log('next', next);
    return prev.concat(Array.isArray(next) ? flatten3(next) : next)
  }, []);
}

console.log(flatten3(arr));

/** es6 扩展运算符：
 *  用于取出参数对象的所有可遍历属性，拷贝到当前对象之中：
 *  我们用这种方法只可以扁平一层，但是顺着这个方法一直思考，我们可以写出这样的方法
 */

 console.log('扩展运算符', [].concat(...arr));

 // 方法4：
 function flatten4(arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
 }
 console.log(flatten4(arr));

/**
 * @description undercore -- 数组扁平化
 * @param {Array} input 要处理得数组
 * @param {boolean} shallow 是否只扁平一层
 * @param {boolean} strict 是否严格处理元素，下面有解释
 * @param {Array} output 这是为了方便递归而传递得参数
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 * 解释下 strict，在代码里我们可以看出，当遍历数组元素时，如果元素不是数组，就会对 strict 取反的结果进行判断，
 * 如果设置 strict 为 true，就会跳过不进行任何处理，这意味着可以过滤非数组的元素，
 */
function flatten5(input, shallow, strict, output) {

  // 递归使用的时候会用到output
  output = output || [];
  var idx = output.length;

  for (var i = 0, len = input.length; i < len; i++) {

    var value = input[i];
    // 如果是数组，就进行处理
    if (Array.isArray(value)) {
      // 如果是只扁平一层，遍历该数组，依次填入output
      if (shallow) {
        var j = 0, length = value.length;
        while (j < length) output[idx++] = value[j++];
      }
      // 如果是全部扁平就递归，传入已经处理的output，递归中接着处理output
      else {
        flatten5(value, shallow, strict, output);
        idx = output.length;
      }
    }

    // 不是数组，根据strict的值判断是跳过不处理还是放入output
    else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
}
console.log(flatten5(arr, false, false));
