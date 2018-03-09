(function () {
	console.log(this);
	// this 指向window,获得全局变量
	var root = this;
	// 保存全局环境下的_变量，到时候进行复制
	var previousUnderscore = root._;
	console.log(previousUnderscore);

	// 实现更少的字节和作用域查找， (可以再浏览数上看原型上有什么内置的方法)
	var ArrayProto = Array.prototype,
		ObjProto = Object.prototype,
		FuncProto = Function.prototype;

	var push = ArrayProto.push,
		slice = ArrayProto.slice,
		toString = ObjectProto.toString,
		hasOwnProperty = ObjectProto.hasOwnProperty;

	// 原生的es5方法
	var nativeIsArray = Array.isArray,
		nativeKeys = Object.keys,
		nativeBind = FuncProto.bind,
		nativeCreate = Object.create;
	
	// 创建一个裸函数 
	var Ctor = function() {};

	// 暴露接口
	var _ = function(obj) {
		console.log(this);
		if(obj instanceof _) return obj;
		if(!(this instanceof _)) return new _(obj);
		this._wrapped = obj;
	};

	// undefined 是string形式得， node.js 扩展
	if(typeof exports !== 'undefined') {
		if(typeof module !== 'undefined' && module.exports) {
			exports = module.exports = _;
		}
		exports._ = _;
	} else {
		root._ = _;
	}

	// 当前版本号
	_.VERSION = '第一遍';

	// 返回一个有效的（用于当前引擎）版本的回调函数的内部函数，可以在其他的下划线函数中重复使用。
	var optimizeCb = function(func, context, argCount) {
		// undefined === void 0 true; ||  null === void 0   false;
		//（void）0相当于undefined，NULL本身的含义为“空”，在c语言代表“不存在、不确定”的含义。
		if(context === void 0) return func;
		switch(argCount == null ? 3: argCount) {
			case 1: return function(value) {
				return func.call(context, value);
			};
			case 2: return function(value, other) {
				return func.call(context, value, other);
			};
			case 3: return function(value, index, collection) {
				return func.call(context, value, index, collection);
			};
			case 4: return function(accumulator, value, index, collection) {
				return func.call(context, accumulator, value, index, collection);
			};
		}
		return function() {
			return func.apply(context, arguments);
		};
	};

	var property = function(key) {
		return function(obj) {
			return obj == null ? void 0 : obj[key];
		};
	}

	var MAX_ARRAY_INDEX = Math.pow(2, 53) -1;
	var getLength = property('length');
	var isArrayLike = function(collection) {
		var length = getLength(collection);
		return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	}

	// ie 9 下的处理   for in 的兼容处理    

	// propertyIsEnumerable()是用来检测属性是否属于某个对象的,如果检测到了,返回true,否则返回false. 
	// 1.这个属性必须属于实例的,并且不属于原型. 
	// 2.这个属性必须是可枚举的,也就是自定义的属性,可以通过for..in循环出来的
	// eg: obj.propertyIsEnumerable("name")
	var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	function collectNonEnumProps(obj, keys) {
		var noEnumIdx = nonEnumerableProps.length;
		var constructor = obj.constructor;
		var proto = (_.isFunction(constructor) && constructor.property) || ObjProto;
		
		// Constructor is a special case.
		// TODO: 研究constructor.property是啥，还有判断函数，还有_each还没有完成
	}

	// 一个给定的变量是一个对象吗？
	_.isObject = function(obj) {
		var type = typeof obj;
		return type === 'function' || type === 'object' && !! obj;
	}

	// 检索object拥有的所有可枚举属性的名称，返回数组。
	_.keys = function(obj) {
		if(!_.isObject(obj)) return [];
		if(nativeKeys) return nativeKeys(obj);
		var keys = [];
		for(var key in obj) if (_.has(obj, key)) keys.push(key);
		// Ahem, IE < 9.
		if (hasEnumBug) collectNonEnumProps(obj, keys);
		return keys;
	}

	_.each = _.forEach = function(obj, iteratee, context) {
		iteratee = optimizeCb(iteratee, context);
		var i, length;
		if(isArrayLike(obj)) {
			for(i = 0, length = obj.length; i < length; i++) {
				iteratee(obj[i], i, obj);
			}
		} else {
			var keys = _.keys(obj);

		}

		return obj;
	}

})(this);