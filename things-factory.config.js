import route from './client/route'
import bootstrap from './client/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'fullfilment-centers',
      page: 'fullfilment-centers'
    },
    {
      tagname: 'fullfilment-center-operato',
      page: 'fullfilment-center-operato'
    }
  ],
  bootstrap
}
