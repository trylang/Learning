/** jQuery的each方法，可用于遍历对象和数组。
 *  回调函数拥有两个参数：第一个为对象的成员或数组的索引，第二个为对应变量或内容。
 */

function isWindow(obj) {
  return obj != null && obj === obj.window;
}

function isArrayLike(obj) {
  // obj 必须要有length属性
  var length = !!obj && "length" in obj && obj.length;
  var typeRes = typeof(obj);

  // 排除掉函数和window对象
  if (typeRes === "function" || isWindow(obj)) {
    return false;
  }

  return typeRes === "array" || length === 0 
  || typeof length === "number" && length > 0 && (length - 1) in obj;

}

// 第一版
function each1(obj, callback) {
  var length, i = 0;
  if (isArrayLike(obj)) {
    length = obj.length;
    for (; i < length; i++) {
      // 终止循环
      // 这个时候，我们就希望 this 能指向当前遍历的元素，然后给每个元素添加 age 属性。
      // 指定 this，我们可以使用 call 或者 apply，其实也很简单：
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
      callback(i, obj[i]);
    }
  } else {
    for (i in obj) {
      // 终止循环
      if (callback(i, obj[i]) === false) {
        break;
      }
      callback(i, obj[i]);
    }
  }
  return obj;
}

// 我们给每个人添加一个 age 属性，age 的值为 18 + index
var person = [{name: 'kevin'},{name: 'daisy'}];
each1(person, function(index, item){
    this.age = 18 + index;
  }
)
console.log(person)
