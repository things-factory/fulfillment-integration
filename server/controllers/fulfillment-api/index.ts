import { getRepository } from 'typeorm'
import { FulfillmentCenters } from '../../entities'
import { api } from './decorators'

export class FulfillmentAPI {
  static platforms = {}

  static registerPlatform(name, action, apis) {
    FulfillmentAPI.platforms[name] = {
      action,
      apis
    }
  }

  static getPlatform(name) {
    return FulfillmentAPI.platforms[name]
  }

  static async getFulfillmentCenter(id) {
    const repository = getRepository(FulfillmentCenters)
    // return await repository.find(id)
    return await repository.findOne({
      where: { id },
      relations: ['domain']
    })
  }

  @api
  static echo(center, req): any {}

  @api
  static getCenterProducts(center, req): any {}
}
