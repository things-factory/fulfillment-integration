import { getRepository } from 'typeorm'
import { FulfillmentCenters } from '../../../entities'

export const updateFulfillmentCenter = {
  async updateFulfillmentCenter(_: any, { name, patch }, context: any) {
    const repository = getRepository(FulfillmentCenters)
    const fulfillmentCenter: any = await repository.findOne({
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...fulfillmentCenter,
      ...patch,
      updater: context.state.user
    })
  }
}
