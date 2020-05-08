const PORT = 2020
const Koa = require('koa')
const app = new Koa()

// 中间件
const middlewareAll = require('./middlewares/index')

// 路由
const routesAll = require('./routes/index')

// 装载
app.use(middlewareAll()).use(routesAll())

// 开启服务器
app.listen(PORT, () => {
  console.log('server start http://localhost:' + PORT)
})
