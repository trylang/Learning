// 场景： 传参处理

function bindEvent(elem, type, selector, fn) {
  if (fn == null) { 
    fn = selector;
    selector = null;
  }

  // ......
};

// 调用
bindEvent(elem, 'click', '#div1', fn);
bindEvent(elem, 'click', fn); // 不传作用对象