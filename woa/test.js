let woniu = {
  // _name: '蜗牛',
  get name() {
    return this._name;
  },
  set name(val) {
    console.log('new name is ' + val);
    this._name = val;
  }
}

console.log(woniu.name); // 蜗牛
woniu.name = 'imooc';
console.log(woniu.name); // imooc



// 同步compose

function add (x, y) {
  return x + y
}

function double(z) {
  return 2 * z
}

const middlewares = [add, double]
let len = middlewares.length

function compose(midds) {
  return (...args) => {
      // 初始值
    let res = midds[0](...args)
    for (let i = 1; i < len; i++) {
      res = midds[i](res)
    }
    return res
  }
}

const fn = compose(middlewares)
let res = fn(1, 2)
console.log(res)


// 异步compose
// 测试代码

async function fn1(next) {
  console.log('fn1')
  await next()
  console.log('end fn1')
}

async function fn2(next) {
  console.log('fn2')
  await delay()
  await next()
  console.log('end fn2')
}

function fn3(next) {
  console.log('fn3')
}
 
function delay() {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove()
    }, 2000)
  })
}