/* 浅拷贝: 对象只会被克隆最外部的一层,至于更深层的对象,则依然是通过引用指向同一块堆内存. */

 function shallowClone(o) {
   const obj = {};
   for( let i in o) {
     obj[i] = o[i];
   }
   return obj;
 }

 // 被克隆对象
const oldObj = {
  a: 1,
  b: [ 'e', 'f', 'g' ],
  c: { h: { i: 2 } }
};

let newObj = shallowClone(oldObj);
console.log(newObj.c.h, oldObj.c.h); // { i: 2 } { i: 2 }
console.log(oldObj.c.h === newObj.c.h); // true

/** 我们可以看到,很明显虽然oldObj.c.h被克隆了,但是它还与oldObj.c.h相等,这表明他们依然指向同一段堆内存,
 * 这就造成了如果对newObj.c.h进行修改,也会影响oldObj.c.h,这就不是一版好的克隆. */
/** 新的apiObject.assign() 也可以实现浅克隆。 */


/**  ===============================  深克隆  ===================================================  */

// 2.1 JSON.parse方法 
/** 前几年微博上流传着一个传说中最便捷实现深克隆的方法, JSON对象parse方法可以将JSON字符串反序列化成JS对象，
 * stringify方法可以将JS对象序列化成JSON字符串,这两个方法结合起来就能产生一个便捷的深克隆. */

let newObj = JSON.parse(JSON.stringify(oldObj));

// 2.2 网络方法 
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

function deepClone(obj) {
  if (typeof obj !== "object" && typeof obj !== 'function') {
    return obj; // 原始类型直接返回
  }
  var o = isArray(obj) ? [] : {};
  for(let i in obj) {
    // Javascript中Object对象原型上的hasOwnProperty()用来判断一个属性是定义在对象本身而不是继承自原型链
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}

/** 坑一： 1.两种方法都无法实现对函数 、RegExp等特殊对象的克隆 */
/** 坑二： 2.会抛弃对象的constructor,所有的构造函数会指向Object */
/** 坑一： 3.对象有循环引用,会报错 */


/** ==========================   对不同对象实现深克隆（填以上三个坑）   ============================================== */
// 先实现一个对象类型判断函数
const isType = (obj, type) => {
  if (typeof obj !== 'object') return false;
  const typeString = Object.prototype.toString.call(obj);
  let flag;
  switch (type) {
    case 'Array': 
      flag = typeString === '[object Array]';
      break;
    case 'Date': 
      flag = typeString === '[object Date]';
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]';
      break;
    default: 
      flag = false;
  }
  return flag;
};

// 对于正则对象,我们在处理之前要先补充一点新知识.
// 我们需要通过正则的扩展了解到flags属性等等,因此我们需要实现一个提取flags的函数.
const getRegExp = re => {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.mulstiline) falgs += 'm';
  return flags
};














