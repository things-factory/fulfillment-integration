import { getRepository } from 'typeorm'
import { FullfilmentCenters } from '../../../entities'

export const fullfilmentCenterResolver = {
  async fullfilmentCenter(_: any, { id }, context: any) {
    const repository = getRepository(FullfilmentCenters)

    return await getRepository(FullfilmentCenters).findOne({
      where: { domain: context.state.domain, id },
      relations: ['domain', 'creator', 'updater']
    })
  }
}
