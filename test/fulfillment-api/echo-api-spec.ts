import { expect } from 'chai'

import { FulfillmentAPI } from '../../server/controllers/fulfillment-api'
import { centers } from './test-centers'

describe('FulfillmentAPI Test - echo', function () {
  it('should return copied object', async function () {
    for (let center of centers) {
      const result = await FulfillmentAPI.echo(center, {
        x: 'x',
        y: 'y'
      })

      expect(result.x).to.equal('x')
      expect(result.y).to.equal('y')
    }
  })
})
