
class Page {

    constructor(length, arg) {
        this.length = length;
        this.arg = arg;
        this.data = Object.keys(Array.from({ length: length }));
    }

    getPage(index, count) {

        let newArr = [];
        let length = (index * count) > this.length ? this.length : (index * count);
        for (let i = (index - 1) * count; i < length; i++) {
            newArr.push(i);
        }

        return newArr;
    }

    reverse() {
        let newArr = [];
        let length = this.arg.length;
        for (let j = length - 1; j >= 0; j--) {
            newArr.push(this.arg[j]);
        }
        return newArr;
    }

    isArray() {
        // es5
        if (Object.prototype.toString.apply(this.arg) === '[object Array]') {
            return true;
        }
        // es6
        if (Array.isArray(this.arg)) {
            return true;
        }
        return false;
    }

    isFunction() {
        // es5
        if (Object.prototype.toString.apply(this.arg) === '[object Function]') {
            return true;
        }

        return false;
    }

}

class Parameter {
    constructor(data) {
        this.data = data ? data : 0;
    }

    clone(src) {
        var dist;
        if (src instanceof Array) {
            dist = [];
            for (var i = 0; i < src.length; i++) {
                dist[i] = this.clone(src[i]);
            }
            return dist;
        } else if (src instanceof Object) {
            dist = {};
            for (var k in src) {
                dist[k] = this.clone(src[k]);
            }
            return dist;
        } else {
            return src;
        }
    }

    uniqArray(arr) {
        let newArr = [];
        let obj = {};
        arr.forEach((element, index) => {
            if (!obj[element]) {
                obj[element] = element;
                newArr.push(element);
            }
        });

        // 如果要引入类库
        // if(typeof Array.prototype['max'] == 'undefined') {
        //     Array.prototype.max = function(){

        //     }
        // }

        // 并求出最大值
        let max = newArr[0];
        newArr.forEach(item => {
            if (max < item) {
                max = item;
            }
        });

        return { newArr, max };
    }

    uniqArray1(arr) {
        let newArr = [];
        arr.forEach(element => {
            if (newArr.indexOf(element) == -1) {
                newArr.push(element);
            }
        })
        return newArr;
    }

    max(arr) {
        // 第一种方法
        return Math.max.apply(null, arr);

        // 第二种方法
        return arr.reduce((x, y) => {
            return x > y ? x : y;
        })
    }

    trim(str) {
        let reg = /(^\s*)|(\s*$)/g;
        return str.replace(reg, '');
        // let reg = /^(0?[1-9])|(1[0-2])$/;
        // let reg1 = /^(1[0-2]|0?[1-9])$/;
        // let reg = /^(\.|\w){6,16}$/g;
        // return reg.test(str);
        //  return str.match(reg);
        // return reg.exec(str);
        // alert(str.match(reg).length)
    }

    each(arr, fn) {
        if (Array.prototype.forEach) {
            arr.forEach((item, index) => {
                fn(item, index);
            });
        } else {
            for (var i in arr) {
                fn(arr[i], i);
            }
        }

    }

    getObjectLength(obj) {
        // Object.keys方法，返回一个数组，成员是对象可遍历的属性的键名
        if (Object.prototype.keys) {
            return Object.keys(obj).length;
        } else {
            let length = 0;
            for (var key in obj) {
                length++;
            }
            return length;
        }

    }

    uniqAndRemoveMaxMin(arr) {
        let max = Math.max.apply(null, arr);
        let min = Math.min.apply(null, arr);
        // let max = arr.reduce((x,y) => {
        //     return x > y ? x : y; 
        // });
        // let min = arr.reduce((x,y) => {
        //     return x < y ? x : y;
        // });
        console.log(max + '===' + min);
        let newArr = arr.filter((item) => {
            return (item !== max && item !== min);
        });
        return newArr;
    }

    findWords(str, find) {
        // let reg = /blog/g;
        let reg = new RegExp(find, 'g');
        let match = str.match(reg);
        return match.length;
    }
}

// const pagehaha = new Page(10, function(){});
// let total = pagehaha.getPage(2, 7);
// let reverseArr = pagehaha.reverse();

let obj = new Parameter();
console.log(obj.uniqArray1([1, 4, 2, 6, 3, 1, 2, 4, 7, 5, 7]));
console.log(obj.max([1, 8, 6, 7, 9, 3, 4, 5, 7]));
console.log(obj.trim("  .aa.a   "));
function output(item, index) {
    console.log(`item: ${item}---index: ${index}`)
}
obj.each(['haha', 'frfr', 'deded'], output);
var shiliObj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};

console.log(obj.getObjectLength(shiliObj));
console.log(obj.uniqAndRemoveMaxMin([9, 3, 78, 23, 9, 3, 1, 56, 78, 1, 1, 2]));
console.log(obj.findWords('sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967', 'blog'));
