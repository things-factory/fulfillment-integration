import { getRepository } from 'typeorm'
import { FullfilmentCenters } from '../../../entities'

export const deleteFullfilmentCenter = {
  async deleteFullfilmentCenter(_: any, { name }, context: any) {
    await getRepository(FullfilmentCenters).delete({ domain: context.state.domain, name })
    return true
  }
}
