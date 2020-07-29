import { FulfillmentCenter } from './fulfillment-center'
import { NewFulfillmentCenter } from './new-fulfillment-center'
import { FulfillmentCenterPatch } from './fulfillment-center-patch'
import { FulfillmentCenterList } from './fulfillment-center-list'

export const Mutation = `
  createFulfillmentCenter (
    fulfillmentCenter: NewFulfillmentCenter!
  ): FulfillmentCenter

  updateFulfillmentCenter (
    name: String!
    patch: FulfillmentCenterPatch!
  ): FulfillmentCenter

  updateMultipleFulfillmentCenter (
    patches: [FulfillmentCenterPatch]!
  ): [FulfillmentCenter]

  deleteFulfillmentCenter (
    name: String!
  ): Boolean

  deleteFulfillmentCenters (
    names: [String]!
  ): Boolean

  generateOperatoAccessToken (
    id: String!
    code: String!
    centerId: String!
  ): FulfillmentCenter

  deactivateOperatoCenter (
    name: String!
  ): FulfillmentCenter
`

export const Query = `
  fulfillmentCenters(filters: [Filter], pagination: Pagination, sortings: [Sorting]): FulfillmentCenterList
  fulfillmentCenter(id: String!): FulfillmentCenter
    
  getOperatoAuthURL (
    centerId: String!
    nonce: String!
    redirectUrl: String!
  ): String
`

export const Types = [FulfillmentCenter, NewFulfillmentCenter, FulfillmentCenterPatch, FulfillmentCenterList]
