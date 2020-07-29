import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { FulfillmentCenters } from '../../../entities'

export const fulfillmentCentersResolver = {
  async fulfillmentCenters(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(FulfillmentCenters).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}
