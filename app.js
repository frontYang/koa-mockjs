const PORT = 2020
const Koa = require('koa')
const app = new Koa()
const routesAll = require('./routes/index')

app.use(routesAll())

app.listen(PORT, () => {
  console.log('http://localhost:' + PORT)
})
