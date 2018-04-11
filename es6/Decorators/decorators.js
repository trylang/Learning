var o, d;
var o = { get foo() { return 17; }, bar: 17, foobar: function () { return "FooBar" } };

d = Object.getOwnPropertyDescriptor(o, 'foo');
console.log(d);
d = Object.getOwnPropertyDescriptor(o, 'bar');
console.log(d);
d = Object.getOwnPropertyDescriptor(o, 'foobar');
console.log(d);