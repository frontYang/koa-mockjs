const KoaRouter = require('koa-router')
const Mock = require('mockjs')
const Random = Mock.Random
const router = new KoaRouter()

router.post('/login', async (ctx, next) => {
  /* ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With') */
  ctx.body = Mock.mock({
    code: 0,
    data: {
      token: Random.word(12)
    }
  })
  await next()
})
module.exports = router
