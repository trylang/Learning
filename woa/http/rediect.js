const http = require('http')
const fs = require('fs')
http.createServer(function(request, response) {
  console.log('request come', request.url);
  if (request.url === '/') {
    response.writeHead(302, {
      'Location': '/new'
    })
    response.end('');
  }
  if (request.url === '/new') {
      
      response.writeHead(200, {
        // 'Content-Type': 'application/javascript'
        'Content-Type': 'text/javascript',
      })
      response.end('console.log("loaded script 123")')
  }
  
}).listen(8888);
console.log('server is listening on 8888');
