import { getRepository } from 'typeorm'
import { FullfilmentCenters } from '../../../entities'

export const createFullfilmentCenter = {
  async createFullfilmentCenter(_: any, { fullfilmentCenter }, context: any) {
    return await getRepository(FullfilmentCenters).save({
      ...fullfilmentCenter,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
