
const woa = require('./application.js')
const app = new woa()

app.use(async ctx => {
  ctx.body = 'hello woa ' + ctx.url
})

// app.use((req, res) => {
//   res.writeHead(200)
//   res.end('hello Jane')
// })

app.listen(9092, () => {
  console.log('server is running on' + 9092)
})










// const http = require('http')

// const server = http.createServer((req, res) => {
//   res.writeHead(200)
//   res.end('hello Jane server')
// })

// server.listen(9092, () => {
//   console.log('server start on port 9092')
// })