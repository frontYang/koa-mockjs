const KoaRouter = require('koa-router')
const Mock = require('mockjs')
const router = new KoaRouter()
const fs = require('fs')
const path = require('path')

// 循环读取site文件夹内的数据，路径名跟文件夹名称一致
const files = fs.readdirSync(path.resolve(__dirname, '', './plan'))

files.forEach((file) => {
  if (file.indexOf('.json') === -1) return
  let url = file.split('.json')[0]
  router.get(`/plan/${url}`, async (ctx, next) => {
    let data = []
    try {
      data = fs.readFileSync(path.resolve(__dirname, '', `./plan/${file}`))
    } catch (error) {
      console.log(error)
    }
    ctx.success(JSON.parse(data))
    await next()
  })
})

// 计划详情
router.get('/plan/get_data', async (ctx, next) => {
  let id = ctx.query.id
  let data = []
  try {
    data = fs.readFileSync(
      path.resolve(
        __dirname,
        '',
        id && id !== ''
          ? './plan/get_data/get_data_for_id.json'
          : './plan/get_data/get_data.json'
      )
    )
  } catch (error) {
    console.log(error)
  }
  ctx.success(JSON.parse(data))
  await next()
})

module.exports = router
