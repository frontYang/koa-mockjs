const KoaRouter = require('koa-router')
const Mock = require('mockjs')
const router = new KoaRouter()
const fs = require('fs')
const path = require('path')

// 值选项————高于出价、低于出价
const priceOptions = [
  { label: '1倍出价' },
  { label: '1.2倍出价' },
  { label: '1.5出价' },
  { label: '其他' }
]

// 值选项————临近预算
const useOptions = [
  { label: '0.5倍预算' },
  { label: '0.8倍预算' },
  { label: '1倍预算' },
  { label: '其他' }
]

router.get('/get_condition_option', async (ctx, next) => {
  let data = []
  try {
    data = fs.readFileSync(path.resolve(__dirname, '', 'tree_data.json'))
  } catch (error) {
    console.log(error)
  }

  ctx.success(JSON.parse(data))
  await next()
})

const actionOptions = [
  { label: '调整至' },
  { label: '提高', type: 'upper_limit' },
  { label: '降低', type: 'lower_limit' }
]

router.get('/action_souce', async (ctx, next) => {
  ctx.success([
    { label: '预算', action: actionOptions },
    { label: '出价', action: actionOptions },
    { label: '开关', action: [{ label: '开' }, { label: '关' }] },
    { label: '通知' }
  ])
  await next()
})

router.get('/tree_souce', async (ctx, next) => {
  let data = []
  try {
    data = fs.readFileSync(path.resolve(__dirname, '', 'tree_data.json'))
  } catch (error) {
    console.log(error)
  }
  ctx.success(JSON.parse(data))
  await next()
})

router.get('/detail', async (ctx, next) => {
  let data = []
  try {
    data = fs.readFileSync(path.resolve(__dirname, '', 'tree_data.json'))
  } catch (error) {
    console.log(error)
  }
  ctx.success(JSON.parse(data))
  await next()
})
module.exports = router
