const KoaRouter = require('koa-router')
const router = new KoaRouter()
const Mock = require('mockjs')
const Random = Mock.Random

router.post('/upload', async (ctx, next) => {
  let data = Mock.mock({
    'data|1-9': {
      url: Random.image('200x100', '#50B347', '#FFF', 'Mock.js')
    }
  })
  ctx.success(data.data)
  await next()
})

module.exports = router
