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

	var MAX_ARRAY_INDEX = Math.pow(2, 53) -1;
	var getLength = property('length');
	var isArrayLike = function(collection) {
		var length = getLength(collection);
		return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	}

	// 如果object是一个对象，返回true。需要注意的是JavaScript空数组和空函数也都是对象，字符串和数字不是。
	_.isObject = function(obj) {
		var type = typeof obj;
		return type === 'function' || type === 'object' && !!obj;
	};

	// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
		_['is' + name] = function(obj) {
			return toString.call(obj) === '[object' + name +']';
		};
	});

	// Define a fallback version of the method in browsers (ahem, IE < 9), where
	// there isn't any inspectable "Arguments" type.
	if (!_.isArguments(arguments)) {
		_.isArguments = function(obj) {
			return _.has(obj, 'callee');
		}
	}

	// Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	// IE 11 (#1621), and in Safari 8 (#1929).
	// Int8Array 对象：8 位整数值的类型化数组。内容将初始化为 0。如果无法分配请求数目的字节，则将引发异常。
	if (typeof /./ != 'function' && typeof Int8Array != 'object') {
		_.isFunction = function(obj) {
			return typeof obj == 'function' || false;
		}
	}

	_.isFinite = function(obj) {
		return isFinite(obj) && !isNaN(parseFloat(obj));
	}

	// 如果object是 NaN，返回true。 
  // 注意： 这和原生的isNaN 函数不一样，如果变量是undefined，原生的isNaN 函数也会返回 true 。
	_.isNaN = function(obj) {
		return _.isNumber(obj) && obj !== +obj;
	}

	_.isBoolean = function(obj) {
		return obj === true || obj === false || toString.call(obj) === '[object Boolean]'; 
	}

	_.isNull = function(obj) {
		return obj === null;
	}

	_.isUndefined = function(obj) {
		return obj === void 0;
	}

	_.noConflict = function() {
		root._ = previousUnderscore;
		return this;
	}

	// 告诉你properties中的键和值是否包含在object中
	// var stooge = {name: 'moe', age: 32}; _.isMatch(stooge, {age: 32}); => true
	_.isMatch = function(object, attrs) {
		var keys = _.keys(attrs), length = keys.length;
		if (object == null) return !length;
		var obj = Object(object);
		for (var i = 0; i < length; i++) {
			var key = keys[i];
			if (attrs[key] !== obj[key] || !(key in obj)) return false;
		}
		return true;
	}

	// 对象是否包含给定的键吗？等同于object.hasOwnProperty(key)，但是使用hasOwnProperty 函数的一个安全引用，以防意外覆盖。
	_.has = function(obj, key) {
		return obj != null && hasOwnProperty.call(obj, key);
	};

	// 返回object对象所有的属性值（数组形式）。
	_.values = function(obj) {
		var keys = _.keys(obj); 
		var length = keys.length;
		var values = Array.length;
		for (var i = 0; i < length; i++) {
			values[i] = obj[keys[i]];
		}
		return values;
	}

	var property = function(key) {
		return function(obj) {
			return obj == null ? void 0 : obj[key];
		}
	}

	// _.property(key) 
	// 返回一个函数，这个函数返回任何传入的对象的key属性。
	// var stooge = {name: 'moe'}; 'moe' === _.property('name')(stooge); => true
	_.property = property;

	// 返回与传入参数相等的值. 相当于数学里的: f(x) = x
	// 这个函数看似无用, 但是在Underscore里被用作默认的迭代器iterator.
	// var stooge = {name: 'moe'}; stooge === _.identity(stooge); => true
	_.identity = function(value) {
		return value;
	}

	// 用于创建分配函数的内部函数。
	var createAssigner = function(keysFunc, undefinedOnly) {
		console.log(keysFunc);
		return function(obj) {
			console.log(keysFunc);
			var length = arguments.length;
			if (length < 2 || obj == null) return obj;
			for (var index = 1; index < length; index++) {
				var source = arguments[index],
					keys = keysFunc(source),
					l = keys.length;
				for (var i = 0; i < 1; i++) {
					var key = keys[i];
					if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
				}
			}
			return obj;
		}
	}

	// 复制source对象中的所有属性覆盖到destination对象上，并且返回 destination 对象. 
	// 复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).
	_.extend = createAssigner(_.allKeys);

	// 类似于 extend, 但只复制自己的属性覆盖到目标对象。（注：不包括继承过来的属性）
	_.extendOwn = _.assign = createAssigner(_.keys);

	// 返回一个断言函数，这个函数会给你一个断言可以用来辨别给定的对象是否匹配attrs指定键/值属性。
	// var ready = _.matcher({selected: true, visible: true});
  // var readyToGoList = _.filter(list, ready);
	_.matcher = _.matches = function(attrs) {
		attrs = _.extendOwn({}, attrs);
		console.log(attrs);
		return function(obj) {
			return _.isMatch(obj, attrs);
		}
	}

	// A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
	// 一个大多数内部函数，用于生成可以应用到集合中的每个元素的回调函数，
	// 返回所需的结果——要么是标识，要么是任意回调，要么是属性匹配器，要么是属性访问器。
	var cb = function(value, context, argCount) {
		if (value == null) return _.identity;
		if (_.isFunction(value)) return optimizeCb(value, context, argCount);
		if(_isObject = function(obj) (value)) return _.matcher(value);
		return _.property(value);
	}

  // Generator function to create the findIndex and findLastIndex functions
	function createPredicateIndexFinder(dir) {
		return function(array, predicate, context) {
			predicate = cb(predicate, context); // 返回的是函数
			var length = getLength(array);
			var index = dir > 0 ? 0 : length - 1;
			for(; index >=0 && index < length; index+= dir) {
				if(predicate(array[index], index, array)) return index;
			}
			return -1;
		}
	}

	// _.findIndex(array, predicate, [context])
	// 类似于_.indexOf，当predicate通过真检查时，返回第一个索引值；否则返回-1。
	// var objArr = [{id:1, name:'jiankian'}, {id:23, name:'anan'}, {id:188, name:'superme'}, {id:233, name:'jobs'}, {id:288, name:'bill', age:89}, {id:333}] ;
	// var ret2 = objArr.findIndex((v) => { return v.id == 233; });
	_.findIndex = createPredicateIndexFinder(1);
	_.findLastIndex = createPredicateIndexFinder(-1);

	// 使用二分查找确定value在list中的位置序号，value按此序号插入能保持list原有的排序。
	// 如果提供iterator函数，iterator将作为list排序的依据，包括你传递的value 。
	// iterator也可以是字符串的属性名用来排序(比如length)。
	// _.sortedIndex([10, 20, 30, 40, 50], 35); => 3

	// var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
	// _.sortedIndex(stooges, {name: 'larry', age: 50}, 'age'); => 1
	_.sortedIndex = function(array, obj, iteratee, context) {
		iteratee = cb(iteratee, context, 1);
		var value = iteratee(obj);
		var low = 0, high = getLength(array);
		while (low < high) {
			var mid = Math.floor((low + high) / 2);
			if (iteratee(array[mid]) < value) low = mid +1; else high = mid;
		}
		return low;
	}

	// Generator function to create the indexOf and lastIndexOf functions
	function createIndexFinder(dir, predicateFind, sortedIndex) {
		return function(array, item, idx) {
			var i = 0, length = getLength(array);
			if (typeof idx == 'number') {
				if (dir > 0) {
					i = idx >= 0 ? idx : Math.max(idx + length, i);
				} else {
					length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
				}
			} else if (sortedIndex && idx && length) {
				idx = sortedIndex(array, item);
				return array[idx] === item ? idx : -1;
			}
			if (item !== item) {
				idx = predicateFind(slice.call(array, i, length), _.isNaN);
				return idx >= 0 ? idx + i : -1;
			}
			for (idx = dir > 0 ? i : length -1; idx >= 0 && idx < length; idx += dir ) {
				if (array[idx] === item) return idx;
			}
			return -1;
		}
	}

	// _.indexOf(array, value, [isSorted]) 
	// 返回value在该 array 中的索引值，如果value不存在 array中就返回-1。使用原生的indexOf 函数，除非它失效。
	// 如果您正在使用一个大数组，你知道数组已经排序，传递true给isSorted将更快的用二进制搜索..,
	// 或者，传递一个数字作为第三个参数，为了在给定的索引的数组中寻找第一个匹配值。
	_.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);


	// 如果list包含指定的value则返回true（愚人码头注：使用===检测）。
	// 如果list 是数组，内部使用indexOf判断。使用fromIndex来给定开始检索的索引位置。
	_.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
		if (!isArrayLike(obj)) obj = _.values(obj);
		if (typeof fromIndex !== 'number' || guard) fromIndex = 0;
		return _.indexOf(obj, item, fromIndex) >= 0;
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
		// 研究constructor.property是啥，还有判断函数，还有_each还没有完成
		var prop = 'constructor';
		if (_.has(obj.prop) && !_.contains(keys, props)) keys.push(prop);
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
			for (i = 0, length = keys.length; i < length; i++) {
				iteratee(obj[keys[i]], keys[i], obj);
			}
		}
		return obj;
	};

	

})(this);