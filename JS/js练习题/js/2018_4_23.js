/** https://juejin.im/post/5adc8e18518825672b0352a8?utm_source=gold_browser_extension */
/** 代码重构 -- 函数需有扩展性，还可以向下兼容 */

let checkType=(function(){
  let rules={
      email(str){
          return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      },
      mobile(str){
          return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
      },
      tel(str){
          return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      },
      number(str){
          return /^[0-9]$/.test(str);
      },
      english(str){
          return /^[a-zA-Z]+$/.test(str);
      },
      text(str){
          return /^\w+$/.test(str);
      },
      chinese(str){
          return /^[\u4E00-\u9FA5]+$/.test(str);
      },
      lower(str){
          return /^[a-z]+$/.test(str);
      },
      upper(str){
          return /^[A-Z]+$/.test(str);
      }
  };
  //暴露接口
  return function (str,type){
      //如果type是函数，就扩展rules，否则就是验证数据
      if(type.constructor===Function){
          rules[str]=type;
      }
      else{
          return rules[type]?rules[type](str):false;
      }
  }
})();

console.log(checkType('188170239','mobile'));

checkType('money',function (str) {
  return /^[0-9]+(.[0-9]{2})?$/.test(str)
});
//使用金额校验规则
console.log(checkType('18.36','money'));


/** format函数 */
let _dete='20180408000000'
function formatStr(str){
    return str.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5:$6")
}
formatStr(_dete);
//"2018-04-08 00:00:00"

/** 函数优化一 */
let _dete='20180408000000'
function formatStr(str,type){
    let _type=type||"xxxx-xx-xx xx:xx:xx";
    for(let i = 0; i < str.length; i++){
        _type = _type.replace('x', str[i]);
    }
    return _type;
}
formatStr(_dete);
//result:"2018-04-08 00:00:00"

/** 函数优化二 */
let _dete='20180408000000'
function formatStr(str,type){
    let i = 0,_type = type||"xxxx-xx-xx xx:xx:xx";
    return _type .replace(/x/g, () => str[i++])
}
formatStr(_dete);
// result:"2018-04-08 00:00:00"
