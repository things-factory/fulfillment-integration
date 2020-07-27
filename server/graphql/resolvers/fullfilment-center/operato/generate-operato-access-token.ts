import fetch from 'node-fetch'
import { getRepository } from 'typeorm'
import { FullfilmentCenters } from '../../../../entities'

import { config } from '@things-factory/env'
const operatoConfig = config.get('fullfilmentIntegrationOperato', {})
const { apiKey, apiSecret } = operatoConfig

export const generateOperatoAccessToken = {
  async generateOperatoAccessToken(_: any, { id, code, centerId }, context: any) {
    const repository = getRepository(FullfilmentCenters)
    const fullfilmentCenter: any = await repository.findOne({
      where: { domain: context.state.domain, id }
    })

    const response = await fetch(`https://${centerId}.myoperato.com/admin/oauth/access_token`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: apiKey,
        client_secret: apiSecret,
        code
      })
    })

    const body = await response.json()
    const { access_token } = body

    if (!access_token) {
      throw new Error(`get seller information failed: ${JSON.stringify(body, null, 2)}`)
    }

    var patch = {
      accessToken: access_token,
      refreshToken: '',
      accessInfo: JSON.stringify(body, null, 2),
      centerId: centerId,
      status: 'active'
    }

    return await repository.save({
      ...fullfilmentCenter,
      ...patch,
      updater: context.state.user
    })
  }
}
