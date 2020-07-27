import { expect } from 'chai'

import { FullfilmentAPI } from '../../server/controllers/fullfilment-api'
import { centers } from './test-centers'

describe('FullfilmentAPI', function () {
  this.timeout(20000)

  describe('getCenterProducts', function () {
    it('should return center products', async function () {
      for (let center of centers) {
        const result = await FullfilmentAPI.getCenterProducts(center, {
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
