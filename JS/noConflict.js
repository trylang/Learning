// console.log($);
// console.log(jQuery);

console.log("=================== test 1 ================================");

// $.noConflict();
// console.log($);  // undefined
// console.log(jQuery); // function()...


console.log("=================== test 2 ================================");

// var _$ = $.noConflict(true); 
// console.log($); // undefined
// console.log(_$); // function()...
// console.log(jQuery); // undefined

console.log("=================== 自己的实现_noConflict ================================");

// var _jQuery = window.jQuery,
// _$ = window.$;
// (function(window, undefined){
//   jQuery.extend({
//     _noConflict: function(deep) {
//       if(window.$ === jQuery) {
//         window.$ = _$;
//       }
//       if(deep && window.jQuery === jQuery) {
//         window.jQuery = _jQuery;
//       }
//       return jQuery;
//     }
//   })

// })(window);

var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery._noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}
	console.log('haha');
	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};


console.log("=================== test 3 ================================");

var _$1 = $._noConflict(true);
// console.log(_$1); // undefined
// console.log($); // function()...
// console.log(jQuery); // undefined


// why? 原来代码就是好使，可以使得_$, _jquery为undefined;