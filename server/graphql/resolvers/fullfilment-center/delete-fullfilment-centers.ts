import { getRepository, In } from 'typeorm'
import { FullfilmentCenters } from '../../../entities'

export const deleteFullfilmentCenters = {
  async deleteFullfilmentCenters(_: any, { names }, context: any) {
    await getRepository(FullfilmentCenters).delete({
      domain: context.state.domain,
      name: In(names)
    })
    return true
  }
}
