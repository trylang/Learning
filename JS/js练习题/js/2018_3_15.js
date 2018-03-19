// https://juejin.im/post/5aa7d82c6fb9a028c522de43?utm_source=gold_browser_extension

// function fn() {};
// fn.valueOf = () => console.log('valueof');
// console.log(fn);

const mul = x => {
  const result = y => {
    console.log(y);
    return mul(x*y); // 递归
  }
  result.valueOf = () => x;
  return result;
}

const mul1 = mul(2)(3);
console.log(mul1);

