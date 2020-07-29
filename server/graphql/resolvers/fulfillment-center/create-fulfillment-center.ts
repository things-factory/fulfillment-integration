import { getRepository } from 'typeorm'
import { FulfillmentCenters } from '../../../entities'

export const createFulfillmentCenter = {
  async createFulfillmentCenter(_: any, { fulfillmentCenter }, context: any) {
    return await getRepository(FulfillmentCenters).save({
      ...fulfillmentCenter,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
