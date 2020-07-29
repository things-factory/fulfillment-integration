import { getRepository } from 'typeorm'
import { FulfillmentCenters } from '../../../entities'

export const deleteFulfillmentCenter = {
  async deleteFulfillmentCenter(_: any, { name }, context: any) {
    await getRepository(FulfillmentCenters).delete({ domain: context.state.domain, name })
    return true
  }
}
