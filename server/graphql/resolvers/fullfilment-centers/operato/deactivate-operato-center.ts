import { getRepository } from 'typeorm'
import { FullfilmentCenters } from '../../../../entities'

export const deactivateOperatoCenter = {
  async deactivateOperatoCenter(_: any, { name }, context: any) {
    const repository = getRepository(FullfilmentCenters)
    const fullfilmentCenter: any = await repository.findOne({
      where: { domain: context.state.domain, name }
    })

    var patch = {
      centerId: '',
      accessToken: '',
      refreshToken: '',
      accessInfo: '',
      countryCode: '',
      status: 'inactive'
    }

    return await repository.save({
      ...fullfilmentCenter,
      ...patch,
      updater: context.state.user
    })
  }
}
