const KoaRouter = require('koa-router')
const Mock = require('mockjs')
const router = new KoaRouter()
const fs = require('fs')
const path = require('path')

// 定向包详情
router.get('/get_data', async (ctx, next) => {
  let data = []
  try {
    data = fs.readFileSync(path.resolve(__dirname, '', './get_data.json'))
  } catch (error) {
    console.log(error)
  }
  ctx.success(JSON.parse(data))
  await next()
})

// 覆盖人数
router.post('/get_estimate_audience', async (ctx, next) => {
  let data = []
  try {
    data = fs.readFileSync(
      path.resolve(__dirname, '', './get_estimate_audience.json')
    )
  } catch (error) {
    console.log(error)
  }
  ctx.success(JSON.parse(data))
  await next()
})

// 达人推荐
router.get('/get_vibrato_suggest', async (ctx, next) => {
  let data = Mock.mock({
    'data|1-9': [
      {
        id: '@id()',
        num: '@character("number")亿',
        name: '@cword(4)',
        catagary: '@cword(2)',
        avatar: 'https://dummyimage.com/35x35'
      }
    ]
  })
  ctx.success(data.data)
  await next()
})

// 达人分类
router.get('/vibrato_catagary', async (ctx, next) => {
  let data = Mock.mock({
    'data|1-9': [
      {
        'id': '@id()',
        'num': '@character("number")亿',
        'name': '@cword(4)',
        'children|1-9': [
          {
            'id': '@id()',
            'num': '@character("number")亿',
            'name': '@cword(4)',
            'children|0-9': [
              {
                id: '@id()',
                num: '@character("number")亿',
                name: '@cword(4)'
              }
            ]
          }
        ]
      }
    ]
  })
  ctx.success(data.data)
  await next()
})

// 达人列表
router.get('/get_vibrato_keyword', async (ctx, next) => {
  let data = Mock.mock({
    'data|1-9': [
      {
        id: '@id()',
        num: '@character("number")亿',
        name: '@cword(4)',
        catagary: '@cword(2)',
        avatar: 'https://dummyimage.com/35x35'
      }
    ]
  })
  ctx.success(data.data)
  await next()
})

module.exports = router
