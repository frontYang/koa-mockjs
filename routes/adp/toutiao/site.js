const KoaRouter = require('koa-router')
const Mock = require('mockjs')
const router = new KoaRouter()
const fs = require('fs')
const path = require('path')

// 循环读取site文件夹内的数据，路径名跟文件夹名称一致
const files = fs.readdirSync(path.resolve(__dirname, '', './site'))

files.forEach((file) => {
  let url = file.split('.json')[0]
  router.get(`/site/${url}`, async (ctx, next) => {
    let data = []
    try {
      data = fs.readFileSync(path.resolve(__dirname, '', `./site/${file}`))
    } catch (error) {
      console.log(error)
    }
    ctx.success(JSON.parse(data))
    await next()
  })
})
module.exports = router
