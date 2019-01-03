const http = require('http')
const fs = require('fs')
http.createServer(function(request, response) {
  console.log('request come', request.url);
  if (request.url === '/') {
    const html = fs.readFileSync('../index.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Security-Policy': 'default-src http: https:'
    })
    response.end(html)
  } else {
    response.writeHead(200, {
      'Content-Type': 'application/javascript'
    })

    response.end('console.log("loaded script")')
    // response.end('alert("loaded script")')
  }
  
}).listen(8888);
console.log('server is listening on 8888');
