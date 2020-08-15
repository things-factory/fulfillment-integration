import { FulfillmentAPI } from './controllers/fulfillment-api'

process.on('bootstrap-module-history-fallback' as any, (app, fallbackOption) => {
  var paths = ['callback-operato']
  fallbackOption.whiteList.push(`^\/(${paths.join('|')})($|[/?#])`)
})

process.on('bootstrap-module-route' as any, (app, routes) => {
  /*
   * koa application에 routes 를 추가할 수 있다.
   *
   * ex) routes.get('/path', async(context, next) => {})
   * ex) routes.post('/path', async(context, next) => {})
   */

  routes.get('/callback-operato', async (context, next) => {
    const { code, state } = context.query

    // state를 fulfillment-center 의 id로 활용한다.
    const store = await FulfillmentAPI.getFulfillmentCenter(state)

    context.redirect(
      `/domain/${store.domain.subdomain}/fulfillment-center-operato/${state}/connect-callback?code=${code}`
    )
  })
})
