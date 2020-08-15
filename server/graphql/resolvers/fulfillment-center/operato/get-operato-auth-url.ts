import { Operato } from '../../../../controllers/operato'

import { config } from '@things-factory/env'
const operatoConfig = config.get('fulfillmentIntegrationOperato', {})
const { appKey, apiSecret } = operatoConfig

export const getOperatoAuthURL = {
  async getOperatoAuthURL(_: any, { centerId, nonce, redirectUrl }, context: any) {
    const operato = new Operato({ appKey, apiSecret, center: centerId })
    return operato.buildAuthURL(redirectUrl, nonce)
  }
}
