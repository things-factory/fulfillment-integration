export * from './operato'

import { action } from './platform-action'
import { echo } from './echo'
import { getCenterProducts } from './get-center-products'

import { FullfilmentAPI } from '../fullfilment-api'

FullfilmentAPI.registerPlatform('operato', action, {
  echo,
  getCenterProducts
})
