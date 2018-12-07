async function test() {
  return 1;
}
console.log(test());

function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      
      resolve('sleep');
      console.log('finish');
    }, 500);
  })
}

async function test2() {
  // await 是异步操作
  let value = await sleep();
  console.log(value);
  return value;
}
console.log(test2()) // Promise {<pending>}

setTimeout(() => {
  console.log(test2()) // Promise {<pending>}
}, 1000);