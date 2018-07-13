
const woa = require('./application.js')
const app = new woa()

app.use((req, res) => {
  res.writeHead(200)
  res.end('hello Jane')
})

app.listen(9092, () => {
  console.log('server is running')
})










// const http = require('http')

// const server = http.createServer((req, res) => {
//   res.writeHead(200)
//   res.end('hello Jane server')
// })

// server.listen(9092, () => {
//   console.log('server start on port 9092')
// })