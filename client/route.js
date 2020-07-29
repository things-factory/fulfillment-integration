export default function route(page) {
  switch (page) {
    case '':
      return '/fulfillment-centers'

    case 'fulfillment-centers':
      import('./pages/fulfillment-centers')
      return page

    case 'fulfillment-center-operato':
      import('./pages/fulfillment-center-operato')
      return page
  }
}
