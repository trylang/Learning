const http = require('http')

// 一直用的ctx也就是context,到底是什么
  // 1. 挂载request和response对象
  // 2. ctx.body = xx 就可以修改相应，如何做到？
  // 3. js的getter和setter，可以有额外操作：vue响应式，检测到读取值

let request = {
  get url() {
    return this.req.url
  }
}

let response = {
  get body() {
    console.log('this._body', this._body)
    return this._body
  },
  set body(val) {
    console.log('val', val)
    this._body = val
  }
}

let context = {
  get url() {
    return this.request.url
  },
  get body() {
    return this.response.body
  },
  set body(val) {
    this.response.body = val
  }
}



class Application {
  constructor() {
    // this.callback = () => {}
    this.context = context
    this.request = request
    this.response = response
  }
  use(callback) {
    this.callback = callback
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      let ctx = this.createCtx(req, res)
      await this.callback(ctx)
      ctx.res.end(ctx.body)
    })
    server.listen(...args)
  }
  createCtx(req, res) {
    let ctx = Object.create(this.context)
    ctx.request = Object.create(this.request)
    ctx.response = Object.create(this.response)
    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }

}

module.exports = Application