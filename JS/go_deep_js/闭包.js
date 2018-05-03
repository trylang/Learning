var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
      console.log(this);
        return scope;
    }
    return f;
}

var foo = checkscope();
console.log(foo());

// 面试必刷题
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();

// 2
var data2 = [];

for (var i = 0; i < 3; i++) {
  data2[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}

data2[0]();
data2[1]();
data2[2]();