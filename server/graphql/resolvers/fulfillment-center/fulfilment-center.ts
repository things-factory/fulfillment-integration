import { getRepository } from 'typeorm'
import { FulfillmentCenters } from '../../../entities'

export const fulfillmentCenterResolver = {
  async fulfillmentCenter(_: any, { id }, context: any) {
    const repository = getRepository(FulfillmentCenters)

    return await getRepository(FulfillmentCenters).findOne({
      where: { domain: context.state.domain, id },
      relations: ['domain', 'creator', 'updater']
    })
  }
}
