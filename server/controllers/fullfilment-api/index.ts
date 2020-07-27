import { getRepository } from 'typeorm'
import { FullfilmentCenters } from '../../entities'
import { api } from './decorators'

export class FullfilmentAPI {
  static platforms = {}

  static registerPlatform(name, action, apis) {
    FullfilmentAPI.platforms[name] = {
      action,
      apis
    }
  }

  static getPlatform(name) {
    return FullfilmentAPI.platforms[name]
  }

  static async getFullfilmentCenter(id) {
    const repository = getRepository(FullfilmentCenters)
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
