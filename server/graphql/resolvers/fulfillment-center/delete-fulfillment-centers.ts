import { getRepository, In } from 'typeorm'
import { FulfillmentCenters } from '../../../entities'

export const deleteFulfillmentCenters = {
  async deleteFulfillmentCenters(_: any, { names }, context: any) {
    await getRepository(FulfillmentCenters).delete({
      domain: context.state.domain,
      name: In(names)
    })
    return true
  }
}
