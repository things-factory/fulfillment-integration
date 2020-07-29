import { expect } from 'chai'

import { FulfillmentAPI } from '../../server/controllers/fulfillment-api'
import { centers } from './test-centers'

describe('FulfillmentAPI', function () {
  this.timeout(20000)

  describe('getCenterProducts', function () {
    it('should return center products', async function () {
      for (let center of centers) {
        const result = await FulfillmentAPI.getCenterProducts(center, {
          pagination: {
            page: 0,
            limit: 100
          }
        })
        expect(Array.isArray(result)).to.be.true
      }
    })
  })
})
