import fetch from 'node-fetch'
import Debug from 'debug'

const debug = Debug('things-factory:fulfillment-integration:operato')

export type OperatoConfig = {
  apiKey: string
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

  buildAuthURL(redirectUrl, nonce) {
    // TODO set accessMode properly https://operato.dev/tutorials/authenticate-with-oauth#step-2-ask-for-permission
    var accessMode = 'per-user'
    // TODO make scopes properly
    var scopes = 'read_products,write_orders,read_customers'

    var { center, apiKey } = this.config

    return `https://${center}.myoperato.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUrl}&state=${nonce}&grant_options[]=${accessMode}`
    // return `https://${centerId}.myoperato.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUrl}&state=${nonce}`
  }

  async get(path: string, data: any) {
    const { center, accessToken } = this.config

    const qs = Object.entries(data)
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&')

    const endpoint = `https://${center}.myoperato.com/admin/api/2020-07${path}${qs ? '?' + qs : ''}`
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

    const endpoint = `https://${center}.myoperato.com/admin/api/2020-07${path}`

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
