export * from './operato'

import { action } from './platform-action'
import { echo } from './echo'
import { getCenterProducts } from './get-center-products'

import { FulfillmentAPI } from '../fulfillment-api'

FulfillmentAPI.registerPlatform('operato', action, {
  echo,
  getCenterProducts
})
