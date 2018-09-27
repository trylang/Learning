console.log('wolaila')


var i = 1;
var sum = 0;
var arr = [];
function haha(i) {
    
    (function(value) {
        setTimeout(function() {
            if (value >= 10) {
                return;
            } else {
                arr.push(value);
                haha(++value);
            }
        }, 0); 
    })(i);
}

haha(1);
console.log(arr);