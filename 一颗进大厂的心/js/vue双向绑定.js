var data = {
  name: 'Jane'
}

// vue 数据劫持
function observe (obj) {
  
  if (!obj || typeof obj !== 'object') {
    return;
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function defineReactive (obj, key, value) {
  observe(value); // 递归子属性
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('get value');
      return value;
    },
    set: function(newVal) {
      value = newVal
    }
  })
}

observe(data);
let name = data.name;
data.name = 'haha';
console.log(data.name)


let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      setBind(value);
      return Reflect.set(target, property, value);
    }
  };
  return new Proxy(obj, handler);
};
let obj = { a: 1 }
let value
let p = onWatch(obj, (v) => {
  value = v
}, (target, property) => {
  console.log(`Get '${property}' = ${target[property]}`);
})
p.a = 2 // bind `value` to `2`
p.a // 