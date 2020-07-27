export default function route(page) {
  switch (page) {
    case '':
      return '/fullfilment-centers'

    case 'fullfilment-centers':
      import('./pages/fullfilment-centers')
      return page

    case 'fullfilment-center-operato':
      import('./pages/fullfilment-center-operato')
      return page
  }
}
