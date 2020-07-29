import route from './client/route'
import bootstrap from './client/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'fulfillment-centers',
      page: 'fulfillment-centers'
    },
    {
      tagname: 'fulfillment-center-operato',
      page: 'fulfillment-center-operato'
    }
  ],
  bootstrap
}
