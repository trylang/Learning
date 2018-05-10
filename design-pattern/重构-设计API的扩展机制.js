/** https://juejin.im/post/5a9d0224f265da23766ac550?utm_source=gold_browser_extension */

//TODO: 重构 - 设计API的扩展机制.
console.info('https://juejin.im/post/5a9d0224f265da23766ac550?utm_source=gold_browser_extension');

/** 重构涉及两个知识： 开放-封闭原则和策略模式 */

// 原始方案

/**
 * @description 字段检验
 * @param checkArr
 * @returns {boolean}
 */
function validataForm(checkArr) {
  let _reg = null, ruleMsg, nullMsg, lenMsg;
  for(let i = 0, len = checkArr.length; i < len; i++) {
    // 如果没字段值是undefined. 不再执行当前循环， 执行下一次循环
    if (checkArr[i].el === undefined) {
      continue;
    }
    // 设置规则错误提示信息
    ruleMsg = checkArr[i].msg || '字段格式错误';
    // 设置值为空则错误提示信息
    nullMsg = checkArr[i].nullMsg || '字段不能为空';
    // 设置长度错误提示信息
    lenMsg = checkArr[i].lenMsg || '字段长度范围' + checkArr[i].minLength + '至' + checkArr[i].maxLength;
    // 如果该字段有空值校验
    if (checkArr[i].noNull === true) {
      // 如果字段为空，返回结果又提示信息
      if (checkArr[i].el === '' || checkArr[i].el === null) {
        return nullMsg;
      }
    }

    // 如果有该字段的规则校验
    if (checkArr[i].rule) {
      // 设置规则
      switch(checkArr[i].rule) {
        case 'mobile':
          _reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
          break;
        case 'tel':
          _reg = /^\d{3}-\d{8}|\d{4}-\d{7}|\d{11}$/;
          break;
      }
      // 如果字段不为空，并且规则错误，返回错误信息
      if (!_reg.test(checkArr[i].el) && checkArr[i].el !== null) {
        return ruleMsg;
      }
    }

    // 如果字段不为空并且长度错误，返回错误信息
    if (checkArr[i].el !== null && checkArr[i].el !== '' && (checkArr[i].minLength || checkArr[i].maxLength)) {
      if (checkArr[i].el.toString().length < checkArr[i].minLength || checkArr[i].el.toString().length > checkArr[i].maxLength) {
        return lenMsg;
      }
    }

    return false;

  }
}

// 调用方式
let testData = {
  name: '',
  phone: '18',
  pwd: '155'
};

let _tips = validataForm([
  {el: testData.phone, noNull: true, nullMsg: '电话号码不能为空', rule: 'mobile', msg: '电话号码格式错误'},
  {el: testData.pwd, noNull: true, nullMsg: '密码不能为空', lenMsg: '密码长度不正确', minLength: 6, maxLength: 18},
]);

// 字段验证如果返回错误信息
console.log(validataForm([
  {el: testData.phone, noNull: true, nullMsg: '电话号码不能为空', rule: 'mobile', msg: '电话号码格式错误'},
  {el: testData.pwd, noNull: true, nullMsg: '密码不能为空', lenMsg: '密码长度不正确', minLength: 6, maxLength: 18},
]));


/** 第二版处理 */
let valiData = function(arr) {
  let ruleData = {
    /**
     * @description 
     * @param {any} val 
     * @param {any} msg 
     * @returns 
     */
    isNoNull(val, msg) {
      if (!val) return msg;
    },

    /**
     * @description 最大长度
     * @param val
     * @param length
     * @param msg
     * @return {*}
     */
    maxLength(val, length, msg){
      if (val.toString().length > length) {
        return msg
      }
    },
    /**
     * @description 
     * @param {any} val 
     * @param {any} msg 
     * @returns 
     */
    isMobile(val, msg) {
      if (!/^1[3-9]\d{9}$/.test(val)) {
        return msg;
      }
    },
  }

  let ruleMsg, checkRule, _rule;
  for (let i = 0, len = arr.length; i < len; i++) {
    // 如果字段找不到
    if (arr[i].el === undefined) {
      return '字段找不到';
    }
    // 遍历规则
    for (let j = 0; j < arr[i].rules.length; j++) {
      // 提取规则
      checkRule = arr[i].rules[j].rule.split(':');
      _rule = checkRule.shift(); // 第一个
      checkRule.unshift(arr[i].el);
      checkRule.push(arr[i].rules[j].msg);
      // 如果规则错误
      ruleMsg = ruleData[_rule].apply(null, checkRule);
      if (ruleMsg) {
        // 返回错误信息
        return ruleMsg;
      }
    }
  }
};

// 调用方式二
console.info(valiData([
  // 校验的数据         // 校验的规则
  {el: testData.name, rules: [{rule: 'isNoNull', msg: '名称不用为空呀！！'}]},
  {el: testData.phone, rules: [{rule: 'isNoNull', msg: '电话不能为空'}, {rule: 'isMobile', msg: '手机号码格式不正确'}]},
  {el: testData.pwd, rules: [{rule: 'isNoNull', msg: '密码不能为空'}, {rule: 'minLength:6', msg: '密码长度不能小于6'}]}
]));