import { getRepository } from 'typeorm'
import { FulfillmentCenters } from '../../../../entities'

export const deactivateOperatoCenter = {
  async deactivateOperatoCenter(_: any, { name }, context: any) {
    const repository = getRepository(FulfillmentCenters)
    const fulfillmentCenter: any = await repository.findOne({
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
      ...fulfillmentCenter,
      ...patch,
      updater: context.state.user
    })
  }
}
