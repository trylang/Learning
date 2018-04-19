/**
 * 1. hash 路由
 */

/** hash路由一个明显的标志是带有#,我们主要是通过监听url中的hash变化来进行路由跳转。 */
/** hash的优势就是兼容性更好,在老版IE中都有运行,问题在于url中一直存在#不够美观,
 *  而且hash路由更像是Hack而非标准,相信随着发展更加标准化的History API会逐步蚕食掉hash路由的市场。 */

/** 1.1 初始化class */
class Routers1 {
  constructor() {
    // 以键值对的形式储存路由
    this.routes = {};
    // 当前路由的URL
    this.currentUrl = '';
  }
}

/** 1.2 实现路由hash储存与执行 */
/** 在初始化完毕后我们需要思考两个问题: （储存hash及对应函数，及触发hash变化，执行对应函数）
 1. 将路由的hash以及对应的callback函数储存
 2. 触发路由hash变化后,执行对应的callback函数 */

class Routers2 {
  constructor() {
    // 以键值对的形式储存路由
    this.routes = {};
    // 当前路由的URL
    this.currentUrl = '';
  }

  // 将path路径与对应的callback函数储存
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }
  // 刷新
  refresh() {
    // 获取当前URL中的hash路径
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]();
  }
}

/** 1.3 监听对应事件 */
/** 我们只需要在实例化Class的时候监听上面的事件即可. */

/** .html <li><a href="#/">turn yellow</a></li> */
/** .js 
 *  Router.route('/blue', function() {
      changeBgColor('blue');
    }); */
class Routers3 {
  constructor() {
    this.routes = {};
    this.currentUrl = '';
    this.refresh = this.refresh.bind(this);
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false);
  }

  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]();
  }
}

/**
 * 2. 增加回退与前进功能
 */

/** 2.1 实现后退功能 */
/** 我们在需要创建一个数组history来储存过往的hash路由例如/blue,
 *  并且创建一个指针currentIndex来随着后退和前进功能移动来指向不同的hash路由。 */

class Routers4 {
  constructor() {
    this.routes = {};
    this.currentUrl = '';
    // 记录出现过的hash
    this.history = [];
    //作为指针，默认指向this.history的末尾，根据后退前进指向history中不同的hash
    this.currentIndex = this.history.length -1;
    this.refresh = this.refresh.bind(this);
    this.backOff = this.backOff.bind(this);
    window.addEventListener('load', this.history, false);
    window.addEventListener('hashchange', this.refresh, false);
  }

  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  refresh() {   
    this.currentUrl = location.hash.slice(1) || '/';
    // 将当前hash路由推进数组储存
    this.history.push(this.currentUrl);
    // 指针向前移动
    this.currentIndex++;
    this.routes[this.currentUrl]();
    console.log('指针：', this.currentUrl);
    console.log(this.history);
  }

  // 后退功能
  backOff() {
    // 如果指针小于0的话就不存在对应hash路由了，因此锁定指针为0即可
    this.currentIndex <= 0 
      ? (this.currentIndex = 0) 
      : (this.currentIndex = this.currentIndex - 1);
    // 随后后退，location.hash也应该随之变化
    location.hash = `#${this.history[this.currentIndex]}`;
    // 执行指针目前指向hash路由对应的callback
    this.routes[this.history[this.currentIndex]]();
  }

}

/** 我们看起来实现的不错,可是出现了Bug,在后退的时候我们往往需要点击两下。 */
/** 问题在于,我们每次在后退都会执行相应的callback,这会触发refresh()执行,
 *  因此每次我们后退,history中都会被push新的路由hash,currentIndex也会向前移动,这显然不是我们想要的。 */

/** 2.2 完整实现hash Router */
class Routers5 {
  constructor() {
    // 储存hash与callback键值对
    this.routes = {};
    // 当前hash
    this.currentUrl = '';
    // 记录出现过的hash
    this.history = [];
    // 作为指针，默认指向this.history的末尾，根据后退前进指向history中不同的hash
    this.currentIndex = this.history.length -1;
    this.refresh = this.refresh.bind(this);
    this.backOff = this.backOff.bind(this);
    // 默认不是后退操作
    this.isBack = false;
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false);
  }
  
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || '/';
    if (!this.isBack) {
      // 如果不是后退操作，且当前指针小于数组总长度，直接截取指针之前的部分储存下来
      // 此操作来避免当点击后退按钮之后，再进行正常跳转，指针会停留在原地，而数组添加新的hash路由
      // 避免再次造成指针的不匹配，我们直接截取指针之前的数组
      // 此操作同时与浏览器自带后退功能的行为保持一致
      if (this.currentIndex < this.history.length -1) {
        this.history = this.history.slice(0, this.currentIndex + 1);      
      }
      this.history.push(this.currentUrl);
      this.currentIndex++;
    }
    this.routes[this.currentUrl]();
    console.log('指针：', this.currentIndex, 'history：', this.history);
    this.isBack = false;
  }

  // 后退功能
  backOff() {
    // 后退操作设置为true
    this.isBack = true;
    this.currentIndex <= 0
      ? (this.currentIndex = 0) 
      : (this.currentIndex = this.currentIndex - 1);
    location.hash = `#${this.history[this.currentIndex]}`;
    this.routes[this.history[this.currentIndex]]();
  }
}


/**
 * 3. HTML5新路由方案
 */

/** 3.1 History API */
/** history.pushState用于在浏览历史中添加历史记录,但是并不触发跳转,此方法接受三个参数，依次为：
  state:一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。
  title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
  url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。 */

/** history.replaceState方法的参数与pushState方法一模一样，区别是它修改浏览历史中当前纪录,而非添加记录,同样不触发跳转。 */

/** popstate事件,每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。 */

/** 需要注意的是，仅仅调用pushState方法或replaceState方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用back、forward、go方法时才会触发。 */

/** 3.2 新标准下路由的实现 */
class Routers6 {
  constructor() {
    this.routes = {};
    // 在初始化时监听popstate事件
    this._bindPopState();
  }

  // 初始化路由
  init(path) {
    history.replaceState({path: path}, null, path);
    this.routes[path] && this.routes[path]();
  }
  
  // 将路径和对应回调函数加入hashMap储存
  route(path, callback) {
    this.routes[path] = callback || function(){};
  }

  // 触发路由对应回调
  go(path) {
    history.pushState({path: path}, null, path);
    this.routes[path] && this.routes[path]();
  }

  // 监听popstate事件
  _bindPopState() {
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    })
  }
}

//TODO: 3.2的新api没有验证，没有搞太懂，需要有时间再研究下

const content = document.querySelector('body');
const button = document.querySelector('button');
function changeBgColor(color) {
  content.style.backgroundColor = color;
}

window.Router = new Routers4();
Router.route('/', function() {
  changeBgColor('yellow');
});
Router.route('/blue', function() {
  changeBgColor('blue');
});
Router.route('/green', function() {
  changeBgColor('green');
});

button.addEventListener('click', Router.backOff, false);


 