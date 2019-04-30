console.log('script start');

async function async1() {
    await async2();
    setTimeout(function() {
        console.log('async1 end');
    }, 2);
}

async function async2() {
    setTimeout(function() {
        console.log('async2 end');
    }, 2);
}
async1();


setTimeout(function() {
    console.log('setTimeout');
}, 0);

new Promise(resolve => {
    console.log('promise');
    resolve()
})
.then(function() {
    console.log('promise1');
})
.then(function() {
    console.log('promise2')
})

console.log('script end');

// 自己猜想结果： 
// script start => promise => script end => async2 end => 
// async1 end => promise1 => promise2 => setTimeout














