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
      // 提取规则（太机智）
      checkRule = arr[i].rules[j].rule.split(':');
      _rule = checkRule.shift(); // 第一个（checkRule删除掉一个，就剩一个空的数组）
      checkRule.unshift(arr[i].el); // 然后新的checkoutRule空数组装进去一个el值
      checkRule.push(arr[i].rules[j].msg); // 再装入一个msg信息
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


/** 所以下面应用开放-封闭原则。给函数的校验规则增加扩展性。在实操之前，大家应该会懵，因为一个函数，可以进行校验的操作，又有增加校验规则的操作。
 *  一个函数做两件事，就违反了单一原则。到时候也难维护，所以推荐的做法就是分接口做。如下写法。 */


// 第三版处理，添加新增规则函数
/** 第二版处理 */
let valiData3 = function(arr) {

  // 全局规则
  let ruleData = {
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
  };

  // 返回处理函数
  return {
    /**
     * @description 查询接口
     * @param {any} arr 
     */
    check: function(arr) {
      let ruleMsg, checkRule, _rule;
      for (let i = 0, len = arr.length; i < len; i++) {
        // 如果字段找不到
        if (arr[i].el === undefined) {
          return '字段找不到';
        }
        // 遍历规则
        for (let j = 0; j < arr[i].rules.length; j++) {
          // 提取规则（太机智）
          checkRule = arr[i].rules[j].rule.split(':');
          _rule = checkRule.shift(); // 第一个（checkRule删除掉一个，就剩一个空的数组）
          checkRule.unshift(arr[i].el); // 然后新的checkoutRule空数组装进去一个el值
          checkRule.push(arr[i].rules[j].msg); // 再装入一个msg信息
          // 如果规则错误
          ruleMsg = ruleData[_rule].apply(null, checkRule);
          if (ruleMsg) {
            // 返回错误信息
            return ruleMsg;
          }
        }
      }
    },

    /**
     * @description 
     * @param {any} type 
     * @param {any} fn 
     */
    addRule: function(type, fn) {
      ruleData[type] = fn;
    }
  };

}();

// 扩展 -- 添加日期范围校验
valiData3.addRule('isDateRank', function(val, msg) {
  if (new Date(val[0]).getTime() >= new Date(val[1]).getTime()) {
    return msg;
  }
});

// 校验函数调用 -- 测试新添加的规则-日期范围校验
console.log(valiData3.check([{
  el:['2017-8-9 22:00:00','2017-8-8 24:00:00'],
  rules:[{
      rule:'isDateRank',msg:'日期范围不正确'
  }]
}]));

/** 因为上面的check接口，只要有一个错误了，就立马跳出了，不会校验下一个。
 *  如果要实现下面的功能，就得实现，如果有一个值校验错误，就记录错误信息，继续校验下一个，等到所有的校验都执行完了之后，再把结果一起返回，那么下面还得暴露一个接口。 */


 // 第四版处理，添加新增规则函数
let valiData5 = function(arr) {

  // 全局规则
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
  };

  // 返回处理函数
  return {
    /**
     * @description 查询接口
     * @param {any} arr 
     */
    check: function(arr) {
      let ruleMsg, checkRule, _rule;
      for (let i = 0, len = arr.length; i < len; i++) {
        // 如果字段找不到
        if (arr[i].el === undefined) {
          return '字段找不到';
        }
        // 遍历规则
        for (let j = 0; j < arr[i].rules.length; j++) {
          // 提取规则（太机智）
          checkRule = arr[i].rules[j].rule.split(':');
          _rule = checkRule.shift(); // 第一个（checkRule删除掉一个，就剩一个空的数组）
          checkRule.unshift(arr[i].el); // 然后新的checkoutRule空数组装进去一个el值
          checkRule.push(arr[i].rules[j].msg); // 再装入一个msg信息
          // 如果规则错误
          ruleMsg = ruleData[_rule].apply(null, checkRule);
          if (ruleMsg) {
            // 返回错误信息
            return ruleMsg;
          }
        }
      }
    },

    /**
     * @description 
     * @param {any} type 
     * @param {any} fn 
     */
    addRule: function(type, fn) {
      ruleData[type] = fn;
    },

    checkAll: function(arr) {
      let ruleMsg, checkRule, _rule, msgArr = [];
      for (let i = 0, len = arr.length; i < len; i++) {
        // 如果字段找不到
        if (arr[i].el === undefined) {
          return '字段找不到';
        }
        // 如果字段为空以及规则不是校验空的规则

        // 遍历规则
        for (let j = 0; j < arr[i].rules.length; j++) {
          // 提取规则
          checkRule = arr[i].rules[j].rule.split(':');
          _rule = checkRule.shift();
          checkRule.unshift(arr[i].el);
          checkRule.push(arr[i].rules[j].msg);
          // 如果规则错误
          ruleMsg = ruleData[_rule].apply(null, checkRule);
          if (ruleMsg) {
            msgArr.push({
              el: arr[i].el,
              alias: arr[i].alias,
              rules: _rule,
              msg: ruleMsg
            })
          }
        }

        // 返回错误信息
        return msgArr.length > 0 ? msgArr : false;
      }
    }
  };

}();


//校验函数调用
console.log(valiData5.checkAll([
  {
      //校验的数据
      el: testData.phone,
      alias:'mobile',
      //校验的规则
      rules: [
          {rule: 'isMobile', msg: '手机号码格式不正确'}
      ]
  }
]));

// alias 可赋值每条规则的错误的信息（vue用法）
// let _this = this;
// FormData.forEach(item => {
//   _this.tips[item.alias] = item.msg;
// });


/** 最后一个方面：向下兼容方案 */

/**因为项目之前有使用了以前的校验 API，不能一刀切，
 * 在以前的 API 没废弃之前，不能影响使用。所以要重写以前的 validateForm，使之兼容现在的新 API : validate 。 */

let validataForm2 = function(arr) {
  let _param = [], _single = {};
  for (let i = 0; i < arr.length; i++) {
    _single = {};
    _single.el = arr[i].el;
    _single.rules = [];
    // 如有非空校验
    if (arr[i].noNull) {
      _single.rules.push({
        rule: 'isNoNull',
        msg: arr[i].nullMsg || '字段不能为空'
      })
    }
    //如果有最小长度校验
    if(arr[i].minLength){
      _single.rules.push({
        rule: 'minLength:'+arr[i].minLength,
        msg: arr[i].lenMsg ||'字段长度范围错误'
      })
    }
    //如果有最大长度校验
    if(arr[i].maxLength){
      _single.rules.push({
        rule: 'maxLength:'+arr[i].maxLength,
        msg: arr[i].lenMsg ||'字段长度范围错误'
      })
    }
    // 如果有规则校验
    // 校验转换规则
    let _ruleData = {
      mobile: 'isMobile'
    }
    if (arr[i].rule) {
      _single.rules.push({
        rule: _ruleData[arr[i].rule],
        msg: arr[i].msg || '字段格式错误'
      })
    }
    _param.push(_single);
  }
  let _result = valiData5.check(_param);
  return _result || false;
}

// 测试
let _tips2 = validataForm2([
  {el: testData.name, noNull: true, nullMsg: '向下兼容的名称不能为空哦！！！'},
  {el: testData.phone, noNull: true, nullMsg: '电话号码不能为空',rule: "mobile", msg: '电话号码格式错误'},
  {el: testData.pwd, noNull: true, nullMsg: '密码不能为空',lenMsg:'密码长度不正确',minLength:6,maxLength:18}
]);
console.log(_tips2);