module.exports = (option = {}) => {
  return async (ctx, next) => {
    const origins = [
      'http://192.168.3.24:8081',
      'http://localhost:8081',
      'http://localhost:8082',
      'http://192.168.3.24:8082'
    ]
    const originIndex = origins.indexOf(ctx.request.header.origin)
    const origin =
      originIndex !== -1
        ? origins[origins.indexOf(ctx.request.header.origin)]
        : ''
    ctx.set('Access-Control-Allow-Origin', origin)
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
        code: code || option.failCode || -1,
        message: msg || option.successMsg || 'fail'
      }
    }
    await next()
  }
}
