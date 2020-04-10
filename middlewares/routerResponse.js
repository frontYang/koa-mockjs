module.exports = (option = {}) => {
  return async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8082')
    ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
    ctx.set('Access-Control-Allow-Credentials', true)

    ctx.success = function (data) {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: option.successCode || 0,
        message: option.successMsg || 'success',
        data: data
      }
    }

    ctx.fail = function (msg, code) {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: code || option.failCode || -99,
        message: msg || option.successMsg || 'fail'
      }
    }
    await next()
  }
}
