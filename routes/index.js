const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

module.exports = () => {
  let routers = []

  // 根据目录定制接口前置路径
  const getPrefix = (router) => {
    let pathArr = router.split('/routes/')[1].split('/')
    let prefix = '/'
    pathArr.forEach((pathname, index) => {
      if (index < pathArr.length - 1) prefix += pathname
      if (index < pathArr.length - 2) prefix += '/'
    })
    return prefix
  }

  glob
    .sync(resolve(__dirname, '', '**/*.js'))
    .filter(
      (value) =>
        value.indexOf('index.js') === -1 && value.indexOf('views.js') === -1
    )
    .map((router) => {
      let curRouter = require(router)
      curRouter.prefix('/api' + getPrefix(router))
      routers.push(curRouter.routes())
      routers.push(curRouter.allowedMethods())
    })
  return compose(routers)
}
