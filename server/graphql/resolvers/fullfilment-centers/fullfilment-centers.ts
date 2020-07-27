import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { FullfilmentCenters } from '../../../entities'

export const fullfilmentCentersResolver = {
  async fullfilmentCenters(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(FullfilmentCenters).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}
