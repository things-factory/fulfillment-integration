import fetch from 'node-fetch'
import { getRepository } from 'typeorm'
import { FulfillmentCenters } from '../../../../entities'

import { config } from '@things-factory/env'
const { host, appKey, appSecret } = config.get('fulfillmentIntegrationOperato', {})

const debug = require('debug')('things-factory:fulfillment-integration:generate-operato-access-token')

export const generateOperatoAccessToken = {
  async generateOperatoAccessToken(_: any, { id, code, centerId }, context: any) {
    const repository = getRepository(FulfillmentCenters)
    const fulfillmentCenter: any = await repository.findOne({
      where: { domain: context.state.domain, id }
    })

    const requestBody = {
      grant_type: 'authorization_code',
      client_id: appKey,
      client_secret: appSecret,
      code
    }

    debug('request body', requestBody)

    const response = await fetch(`http://${centerId}.${host}/admin/oauth/access_token`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    const body = await response.json()
    const { access_token } = body

    if (!access_token) {
      throw new Error(`get fulfillment center information failed: ${body}`)
    }

    var patch = {
      accessToken: access_token,
      refreshToken: '',
      accessInfo: JSON.stringify(body, null, 2),
      centerId: centerId,
      status: 'active'
    }

    return await repository.save({
      ...fulfillmentCenter,
      ...patch,
      updater: context.state.user
    })
  }
}
