import { fulfillmentCenterResolver } from './fulfillment-center'
import { fulfillmentCentersResolver } from './fulfillment-centers'

import { updateMultipleFulfillmentCenter } from './update-multiple-fulfillment-center'
import { updateFulfillmentCenter } from './update-fulfillment-center'
import { createFulfillmentCenter } from './create-fulfillment-center'
import { deleteFulfillmentCenter } from './delete-fulfillment-center'
import { deleteFulfillmentCenters } from './delete-fulfillment-centers'

import * as Operato from './operato'

export const Query = {
  ...fulfillmentCentersResolver,
  ...fulfillmentCenterResolver,
  ...Operato.Query
}

export const Mutation = {
  ...updateFulfillmentCenter,
  ...updateMultipleFulfillmentCenter,
  ...createFulfillmentCenter,
  ...deleteFulfillmentCenter,
  ...deleteFulfillmentCenters,
  ...Operato.Mutation
}
