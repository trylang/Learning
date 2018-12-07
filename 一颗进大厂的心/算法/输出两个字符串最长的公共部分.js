function find(str1, str2) {
  let shorter, longer, targetString;
  if (str1.length > str2.length) {
    shorter = str2;
    longer = str1;
  } else {
    shorter = str1;
    longer = str2;
  }

  for (let subLength = shorter.length; subLength > 0; subLength--) {
    for (var i = 0; i + subLength <= shorter.length; i++) {
      var subString = shorter.substring(i, i + subLength);
      if (longer.indexOf(subString) >= 0) {
        targetString = subString
        return targetString;
      }
    }
  }
}

let string = find ('1234567890', '2347890');
console.log(string);

// 逻辑
// 1. 在外层短字符串的倒序循环，subLength，短字符长度逐层递减；
// 2. 第二层循环短字符串正序循环，但最开始的下标，是从 i + subLength；第二层的循环为的是做数字截取，从整个short短字符开始，
//    例如上面例子，2347890整个不是公共部分，那就从2347890.length-1开始，截取位置是正序。
// 3. 意思即是：i 代表正序截取的位置，i + subLength就是截取的长度。
