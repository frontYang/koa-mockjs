const KoaRouter = require('koa-router')
const Mock = require('mockjs')
const router = new KoaRouter()
const fs = require('fs')
const path = require('path')
const utils = require('util')

// 循环读取site文件夹内的数据，路径名跟文件夹名称一致
const files = fs.readdirSync(path.resolve(__dirname, '', './direct'))

files.forEach((file) => {
  if (file.indexOf('.json') === -1) return
  let url = file.split('.json')[0]
  router.get(`/direct/${url}`, async (ctx, next) => {
    let data = []
    try {
      data = fs.readFileSync(path.resolve(__dirname, '', `./direct/${file}`))
    } catch (error) {
      console.log(error)
    }
    ctx.success(JSON.parse(data))
    await next()
  })
})

// 定向包详情
router.get('/direct/get_data', async (ctx, next) => {
  let id = ctx.query.id
  let data = []
  try {
    data = fs.readFileSync(
      path.resolve(
        __dirname,
        '',
        id && id !== ''
          ? './direct/get_data/get_data_for_id.json'
          : './direct/get_data/get_data.json'
      )
    )
  } catch (error) {
    console.log(error)
  }
  ctx.success(JSON.parse(data))
  await next()
})

// 达人推荐
router.get('/direct/get_vibrato_suggest', async (ctx, next) => {
  let data = Mock.mock({
    'data|1-9': [
      {
        'id|+1': 1,
        'num': '@character("number")亿',
        'name': '@cword(4)',
        'catagary': '@cword(2)',
        'avatar': 'https://dummyimage.com/35x35'
      }
    ]
  })
  ctx.success(data.data)
  await next()
})

// 达人分类
router.get('/direct/vibrato_catagary', async (ctx, next) => {
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
router.get('/direct/get_vibrato_keyword', async (ctx, next) => {
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
