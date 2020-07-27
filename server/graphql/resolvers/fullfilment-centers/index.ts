import { fullfilmentCenterResolver } from './fullfilment-center'
import { fullfilmentCentersResolver } from './fullfilment-centers'

import { updateMultipleFullfilmentCenter } from './update-multiple-fullfilment-center'
import { updateFullfilmentCenter } from './update-fullfilment-center'
import { createFullfilmentCenter } from './create-fullfilment-center'
import { deleteFullfilmentCenter } from './delete-fullfilment-center'
import { deleteFullfilmentCenters } from './delete-fullfilment-centers'

import * as Operato from './operato'

export const Query = {
  ...fullfilmentCentersResolver,
  ...fullfilmentCenterResolver,
  ...Operato.Query
}

export const Mutation = {
  ...updateFullfilmentCenter,
  ...updateMultipleFullfilmentCenter,
  ...createFullfilmentCenter,
  ...deleteFullfilmentCenter,
  ...deleteFullfilmentCenters,
  ...Operato.Mutation
}
