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

// 默认条件选项
const defaultOptions = [
  { label: '大于', placeholder: '例1', type: 'input' },
  { label: '小于', placeholder: '例1', type: 'input' },
  { label: '介于', placeholder: '例1', type: 'input2' }
]

// 额外条件选项————转化成本、新增成本
const priceRule = [
  {
    label: '高于出价',
    placeholder: '请选择',
    type: 'select',
    options: priceOptions
  },
  {
    label: '低于出价',
    placeholder: '请选择',
    type: 'select',
    options: priceOptions
  }
]

// 额外条件选项————消耗
const useRule = [
  {
    label: '临近预算',
    placeholder: '请选择',
    type: 'select',
    options: useOptions
  }
]

router.get('/rule_source', async (ctx, next) => {
  ctx.success([
    { label: '激活数', rule: defaultOptions },
    { label: '激活成本', rule: defaultOptions },
    { label: '转化数', rule: defaultOptions },
    { label: '总花费', rule: defaultOptions },
    { label: '转化成本', rule: priceRule.concat(defaultOptions) },
    { label: '展示数', rule: defaultOptions },
    { label: '点击数', rule: defaultOptions },
    { label: '点击率', rule: defaultOptions },
    { label: '新增用户', rule: defaultOptions },
    { label: '新增成本', rule: priceRule.concat(defaultOptions) },
    { label: '付费金额', rule: defaultOptions },
    { label: '新增付费用户', rule: defaultOptions },
    { label: '消耗', rule: useRule.concat(defaultOptions) },
    { label: '新增付费金额', rule: defaultOptions },
    { label: '新增arpu', rule: defaultOptions }
  ])
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
module.exports = router
