

var i = 1;
var sum = 0;
var arr = [];
var code = 0;
setTimeout(function() {
    code = 200;
}, 500);

function haha(i) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (i < 10) {
                i++;
                ddedede(i);
                resolve(i);     
            }
            
        }, 500);
    })
}

// haha(1)
// .then(function(value) {
//     arr.push(value);
//     value++;
//     haha(value);
//     console.log(arr)
// });

// haha(2)
// .then(function(value) {
//     arr.push(value);
//     value++;
//     haha(value);
//     console.log(arr)
// })

// haha(3)
// .then(function(value) {
//     arr.push(value);
//     value++;
//     haha(value);
//     console.log(arr)
// });

function ddedede (value) {
    if (value < 10) {
        haha(value)
        .then(function(val) {
            arr.push(val);
            if (arr.indexOf(val) < 0) {
                haha(val);
            }  
            console.log(arr)
        })
    }
}

ddedede(1);

