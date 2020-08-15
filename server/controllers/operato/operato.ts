import fetch from 'node-fetch'
import Debug from 'debug'

import { config } from '@things-factory/env'
const { host } = config.get('fulfillmentIntegrationOperato', {})

const debug = Debug('things-factory:fulfillment-integration:operato')

export type OperatoConfig = {
  appKey: string
  apiSecret: string
  center: string
  accessToken?: string
}

export class Operato {
  private config: OperatoConfig

  constructor(config: OperatoConfig) {
    this.config = {
      ...config
    }
  }

  buildAuthURL(redirectUrl, state) {
    // TODO make scopes properly
    var scopes = 'write_orders, read_inventory'

    var { center, appKey } = this.config

    return `http://${center}.${host}/admin/oauth/authorize?response_type=code&client_id=${appKey}&scope=${scopes}&redirect_uri=${redirectUrl}&state=${state}`
  }

  async get(path: string, data: any) {
    const { center, accessToken } = this.config

    const qs = Object.entries(data)
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&')

    const endpoint = `http://${center}.${host}/admin/api/2020-07${path}${qs ? '?' + qs : ''}`
    debug('endpoint', endpoint)

    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'X-Operato-Access-Token': accessToken
      }
    })

    const result = await response.json()
    debug('response result', result)

    return result
  }

  async post(path: string, data: any = {}) {
    const { center, accessToken } = this.config

    debug('data', data)

    const jsondata = JSON.stringify(data)

    const endpoint = `http://${center}.${host}/admin/api/2020-07${path}`

    const response = await fetch(endpoint, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Operato-Access-Token': accessToken
      },
      body: jsondata
    })

    const result = await response.json()
    debug('response result', result)

    return result
  }
}
