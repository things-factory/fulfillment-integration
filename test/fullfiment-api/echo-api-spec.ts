import { expect } from 'chai'

import { FullfilmentAPI } from '../../server/controllers/fullfilment-api'
import { centers } from './test-centers'

describe('FullfilmentAPI Test - echo', function () {
  it('should return copied object', async function () {
    for (let center of centers) {
      const result = await FullfilmentAPI.echo(center, {
        x: 'x',
        y: 'y'
      })

      expect(result.x).to.equal('x')
      expect(result.y).to.equal('y')
    }
  })
})
