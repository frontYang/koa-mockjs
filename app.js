const PORT = 2020
const Koa = require('koa')
const cors = require('koa2-cors')
const router = require('koa-router')()
const glob = require('glob')
const onerror = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const koaViews = require('koa-views')
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, './', dir)

// 数据库连接
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '127.0.0.1', // 数据库地址
  user: 'root', // 数据库用户
  password: '123456', // 数据库密码
  database: 'koa_test' // 选中数据库
})

connection.connect((err) => {
  if (err) {
    console.log('[query] - :' + err)
    return
  }

  console.log('[connection connect]  succeed!')

  const app = new Koa()

  // error handler
  onerror(app)

  // 中间件
  const middlewareAll = require('./middlewares/index')

  // 路由
  const routesAll = require('./routes/index')

  // 首页界面，动态展示生成的Mock API链接
  app.use(
    koaViews(resolve('./views'), {
      extension: 'pug'
    })
  )
  router.get('/', async (ctx, next) => {
    const routers = []
    glob
      .sync(resolve('routes/**/*.js'))
      .filter((value) => value.indexOf('index.js') === -1)
      .map((router) => {
        let curRouter = require(router)
        curRouter.stack.forEach((stack) => {
          routers.push(stack.path)
        })
      })
    const data = []
    routers.forEach((href) => {
      data.push(href)
    })

    await ctx.render('index', {
      title: 'Koa2 + mockjs',
      links: data
    })
  })

  // logger
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

  // 静态资源
  app.use(koaStatic(resolve('public')))

  // 装载首页
  app.use(router.routes())

  // 装载接口
  app.use(cors()).use(bodyParser()).use(middlewareAll()).use(routesAll())

  // error-handling
  app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
  })

  // 开启服务器
  app.listen(PORT, () => {
    console.log('server start http://localhost:' + PORT)
  })
})
