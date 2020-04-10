const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

module.exports = () => {
  let middlewares = []
  glob
    .sync(resolve(__dirname, '', '*.js'))
    .filter((value) => value.indexOf('index.js') === -1)
    .map((middleware) => {
      let curMiddleware = require(middleware)
      middlewares.push(curMiddleware())
    })
  return compose(middlewares)
}
