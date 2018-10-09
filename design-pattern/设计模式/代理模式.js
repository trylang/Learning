class RealImg {
  constructor(fileName) {
    this.fileName = fileName;
    this.loadFromDisk(); // 初始化，即从硬盘中加载模拟
  }

  display() {
    console.log("display..." + this.fileName);
  }

  loadFromDisk() {
    console.log("loading..." + this.fileName);
  }
}

class ProxyImg {
  constructor(fileName) {
    this.realImg = new RealImg(fileName);
  }
  display() {
    this.realImg.display();
  }
}

// test
let proxyImg = new ProxyImg("1.png");
proxyImg.display();

/**
 *  场景： 1.网页事件代理；2.jQuery $.proxy; 3.ES6 proxy
 *  代理模式和适配器模式的区别：
 *  1. 适配器：提供一个不同的接口（如不同版本的插头）
 *  2. 代理：提供一模一样的接口； 显示原有功能，但是经过限制或者阉割后的
 *  3. 装饰器：扩展功能，原有功能不变且可直接使用；
 */

// 明星
let star = {
  name: "lang**",
  age: 18,
  phone: 'star: 1234678'
};

// 经纪人
let agent = new Proxy(star, {
  get: function(target, key) {
    if (key === 'phone') {
      // 返回经纪人自己的电话
      return 'agent: 1556332';
    }
    if (key === 'price') {
      // 明星不报价，经纪人报价
      return 12000;
    }
  },
  set: function(target, key, val) {
    if (target === 'customPrice') {
      if (val < 10000) {
        throw new Error('报价太低');
      } else {
        target[key] = val;
        return true; // 需要返回true，不然赋值不会成功
      }
    }
  }
})

// test 
console.log(agent.name);
console.log(agent.age);
console.log(agent.phone);
console.log(agent.price]);

agent.customPrice = 9000;
console.log('agent.customPrice', agent.customPrice);