/** 我们最后会通过类似于vue的方式来使用我们的双向数据绑定，结合我们的数据结构添加注释 */
// const Vue = {
// };
// var app = new Vue({
//   el: '#app',
//   data: {
//     number: 0
//   },
//   methods: {
//     increment: function () {
//       this.number++;
//     },
//   }
// });

/** 首先定义一个myVue构造函数 */
function myVue(options) {
  this._init(options);
}

/** 初始化这个构造函数 */
myVue.prototype._init = function (options) {
  this.$options = options; // options 为上面使用时传入的结构体，包括el，data. methods
  this.$el = document.querySelector(options.el); // el是#app, this.$el是id为app的element元素
  this.$data = options.data; // this.$data = {number: 0}
  this.$methods = options.methods; // this.$methods = {increment: function(){}};

  // _binding保存着model与view的映射关系，也就是我们前面定义的watcher的实例。
  // 当model改变时，我们会触发其中的指令类更新，保证view也能实时更新。
  this._binding = {};

  this._obverse(this.$data);
  this._complie(this.$el);
}

/** 接下来实现_obverse函数，对data进行处理，重写data的set和get函数。并改造_init函数 */
myVue.prototype._obverse = function (obj) { // obj = {number: 0};
  var value;
  for (key in obj) { // 遍历obj 对象
    if (obj.hasOwnProperty(key)) {
      value = obj[key];
      if (typeof value === 'object') { //如果值还是对象，则遍历处理
        this._obverse(value);
      }
      if (obj.hasOwnProperty(key)) {
        this._binding[key] = { // 按照前面的数据，_binging = {number: _directives: []}
          _directives: []
        };
      }
      var binding = this._binding[key];
      Object.defineProperty(this.$data, key, { //关键
        enumerable: true,
        configurable: true,
        get: function () {
          console.log(`获取${value}`);
          return value;
        },
        set: function (newValue) {
          console.log(`更新${newValue}`);
          if (value !== newValue) {
            value = newValue;
            binding._directives.forEach(item => {
              // 当number改变时，触发_binging[number]._directives中绑定的watcher类更新
              item.update();
            })
          }
        }
      })
    }

  }
}

/** 接下来我们写一个指令类Watcher，用来绑定更新函数，实现对DOM元素的更新。 */
function Watcher(name, el, vm, exp, attr) {
  this.name = name; // 指令名称，例如文本节点，该值设为"text"
  this.el = el; // 指令对应的DOM元素
  this.vm = vm; // 指令所属myVue实例
  this.exp = exp; // 指令对应的值，本例如"number"
  this.attr = attr; // 绑定的属性值，本例为"innerHTML"

  this.update();
}

Watcher.prototype.update = function () {
  this.el[this.attr] = this.vm.$data[this.exp];
}

/** 那么如何将view与model进行绑定呢？接下来我们定义一个_compile函数，
 *  用来解析我们的指令（v-bind,v-model,v-clickde）等，并在这个过程中对view与model进行绑定。 */
myVue.prototype._complie = function (root) {
  // root为id是app的Element元素，也就是我们的根元素
  var _this = this;
  var nodes = root.children;
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.children.length) { // 对所有元素进行遍历，并进行处理
      this._complie(node);
    }

    // 如果有v-click属性，我们监听它的onclick事件，触发increment事件，即number++;
    if (node.hasAttribute('v-click')) {
      node.onclick = (function () {
        var attrVal = nodes[i].getAttribute('v-click');
        // bind是使data的作用域与method函数的作用域保持一致
        return _this.$methods[attrVal].bind(_this.$data);
      })();
    }

    // 如果有v-model属性，并且元素是INPUT或者TEXTAREA，我们监听它的input事件
    if (node.hasAttribute('v-model') && (node.tagName == 'INPUT' || node.tagName == 'TEXTAREA')) {
      node.addEventListener('input', (function (key) {
        var attrVal = node.getAttribute('v-model');
        // _this._binding['number']._directives = ['一个Watcher实例'];
        // 其中Watcher.prototype.update = function() {
        //   node['value'] = _this.$data['number']; 这就将node的值保持与number一致
        // }
        _this._binding[attrVal]._directives.push(new Watcher(
          'input',
          node,
          _this,
          attrVal,
          'value'
        ));
        return function () {
          // 使number的值与node的value保持一致，已经实现了双向绑定
          _this.$data[attrVal] = nodes[key].value;
        }
      })(i));
    }

    // 如果有v-bind属性，我们只要使node的值及时更新为data中number的值即可
    if (node.hasAttribute('v-bind')) {
      var attrVal = node.getAttribute('v-bind');
      _this._binding[attrVal]._directives.push(new Watcher(
        'text',
        node,
        _this,
        attrVal,
        'innerHTML'
      ))
    }

  }
}

window.onload = function () {
  var app = new myVue({
    el: '#app',
    data: {
      number: 0
    },
    methods: {
      increment: function () {
        this.number++;
      },
    }
  });
}
