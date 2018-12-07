## XMLHttpRequest 对象

1. Represents an XML request using HTTP。 代表一个使用http协议的xml请求。该请求能在不重载整个页面的情况下更新局部数据。

2. XMLHttpRequest 对象拥有3种类型的成员：Events, Methods, Properties。


```
    var oReq = new XMLHttpRequest();
    oReq.open('GET', 'http://localhost/test.html', true);
    oReq.onreadystatechange = reportStatus; // 数据返回即触发此事件，获取返回数据并处理
    oReq.send(); // 发送请求
    function reportStatus() {
        if (oReq.readyState == 4) { // complete
            if (oReq.status == 200 || oReq.status == 304) {
                alert('Transfer complete');
            } else {
                // error
            }
        }
    }
```

3. open方法中，true为异步，false为同步。为true时，通过设置onreadystatechange事件属性，返回时即触发该事件。

4. send方法，发送一个HTTP请求，并返回一个response。


