// http://blog.csdn.net/u013938465/article/details/56670850
// https://www.cnblogs.com/jiangxiaobo/p/6548335.html

function handler( event ){
  console.log( event.namespace );
}

var $p = $("p");
$p.on( "click", handler );

// A：为所有p元素绑定click事件，定义在abc和foo两个命名空间下
$p.on( "click.abc.foo", handler );

// B：为所有p元素绑定click事件，定义在test命名空间下
$p.on( "click.test", handler );

// C：为所有p元素绑定click事件，定义在new和foo两个命名空间下
$p.on( "click.new.foo", handler );


// 执行所有的click事件处理函数，不限定命名空间 (触发A、B、C)
$p.trigger( "click" ); // ""


// 执行定义在abc命名空间下的click事件处理函数 (触发A)
$p.trigger( "click.abc" ); // "abc"
// 执行定义在foo命名空间下的click事件处理函数 (触发A和C)
$p.trigger( "click.foo" ); // "foo"
// 执行同时定义在foo和abc命名空间下的click事件处理函数 (触发A)
$p.trigger( "click.foo.abc" ); // "abc.foo"
// 执行定义在test命名空间下的click事件处理函数 (触发C)
$p.trigger( "click.test" ); // "test"


// 移除所有定义在foo命名空间下的click事件处理函数
// $p.off( "click.foo" );