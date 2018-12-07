// 对于封装好的api,如何截获参数。比如xml对象中的open方法会传入url, method, headers参数，现在需要截获headers添加一些自定义的属性，怎么做？
var _open = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(url, method, headers) {
  headers = {};
  _open.call(this, url, method, headers);
}
