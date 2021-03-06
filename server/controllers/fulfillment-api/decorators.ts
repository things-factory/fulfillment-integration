import Debug from 'debug'
const debug = Debug('things-factory:fulfillment-integration:fulfillment-api-decorator')

import { FulfillmentCenters } from 'server/entities'

const NOOP = v => v

export const api = (target: Object, property: string, descriptor: TypedPropertyDescriptor<any>): any => {
  const method = descriptor.value

  descriptor.value = async function (center: FulfillmentCenters, request) {
    const FulfillmentAPI = this

    var { platform } = center

    var { action: platformAction, apis } = FulfillmentAPI.getPlatform(platform)

    var m = apis[method.name]
    if (!m) {
      throw Error(`Fulfillment Platform '${platform}' doesn't have API ${method.name}`)
    }

    var {
      path,
      method: httpMethod = 'post',
      denormalize = NOOP,
      normalize = NOOP,
      action = platformAction
    } = m.apply(this, [request])

    var denormalized = denormalize(request || {})
    debug('request', denormalized)

    var response = await action.apply(this, [{ center, httpMethod, path, request: denormalized, platformAction }])

    debug('response', response)

    return normalize(response)
  }

  return descriptor
}
