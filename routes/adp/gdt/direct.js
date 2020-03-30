const KoaRouter = require('koa-router')
const Mock = require('mockjs')
const router = new KoaRouter()

router.get('/test', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
  ctx.body = Mock.mock({
    status: 200,
    'data|1-9': [
      {
        'name|5-8': /[a-zA-Z]/,
        'id|+1': 1,
        'value|0-500': 20,
      },
    ],
  })
  await next()
})
module.exports = router
