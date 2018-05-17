/** 数组的拷贝：slice，concat返回一个新数组的特性，是浅拷贝。
 *  复制引用的拷贝方法称之为浅拷贝，与之对应的就是深拷贝，深拷贝就是指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，
 *  修改一个对象的属性，也不会影响另一个。
 */

/** 深拷贝技巧：new_arr = JSON.parse(JSON.stringify(arr))。
 *  但这种粗暴的方法有个问题：就是不能拷贝函数。
 */

/** 浅拷贝的实现：遍历对象，然后把属性和属性值都放在一个新的对象不就好了 */
var shallowCopy = function(obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  // 遍历obj，并且判断是obj的属性才拷贝
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj; 
}

var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}];
console.log(shallowCopy(arr));

/** 那如何实现一个深拷贝呢？说起来也好简单，我们在拷贝的时候判断一下属性值的类型，
 *  如果是对象，我们递归调用深拷贝函数不就好了~ */
var deepCopy = function (obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}
console.log(deepCopy(arr));