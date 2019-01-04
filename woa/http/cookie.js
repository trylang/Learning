const http = require('http')
const fs = require('fs')
http.createServer(function(request, response) {
  console.log('request come', request.url);
  if (request.url === '/') {
    const html = fs.readFileSync('../index.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Set-Cookie': ['id=123; max-age=2', 'key=abc; HttpOnly']
      // 'Content-Security-Policy': 'default-src http: https:'
    })
    response.end(html)
  }
  if (request.url === '/test.js') {
    const etag = request.headers['if-none-match'];
    console.log(111111, etag);
    if (etag === '777') { // 服务器需要做缓存判断，如果etag与请求头中if-none-match值一样，那就直接从浏览器本地找缓存，并返回304。
      response.writeHead(304, {
        // 'Content-Type': 'application/javascript'
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=2000000, no-cache',
        'Last-Modified': '123',
        'Etag': '777'
      })
      response.end('');
    } else {
      response.writeHead(200, {
        // 'Content-Type': 'application/javascript'
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=2000000, no-cache',
        'Last-Modified': '123',
        'Etag': '777'
      })
      response.end('console.log("loaded script 123")')
    }

    // response.end('alert("loaded script")')
  }
  
}).listen(8888);
console.log('server is listening on 8888');
