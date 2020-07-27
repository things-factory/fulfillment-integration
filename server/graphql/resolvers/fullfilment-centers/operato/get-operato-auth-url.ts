import { Operato } from '../../../../controllers/operato'

import { config } from '@things-factory/env'
const operatoConfig = config.get('marketplaceIntegrationOperato', {})
const { apiKey, apiSecret } = operatoConfig

export const getOperatoAuthURL = {
  async getOperatoAuthURL(_: any, { centerId, nonce, redirectUrl }, context: any) {
    const operato = new Operato({ apiKey, apiSecret, shop: centerId })
    return operato.buildAuthURL(redirectUrl, nonce)
  }
}
