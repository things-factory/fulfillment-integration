import { getRepository } from 'typeorm'
import { FullfilmentCenters } from '../../../entities'

export const updateFullfilmentCenter = {
  async updateFullfilmentCenter(_: any, { name, patch }, context: any) {
    const repository = getRepository(FullfilmentCenters)
    const fullfilmentCenter: any = await repository.findOne({
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...fullfilmentCenter,
      ...patch,
      updater: context.state.user
    })
  }
}
