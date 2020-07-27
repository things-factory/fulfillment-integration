import { FullfilmentCenter } from './fullfilment-center'
import { NewFullfilmentCenter } from './new-fullfilment-center'
import { FullfilmentCenterPatch } from './fullfilment-center-patch'
import { FullfilmentCenterList } from './fullfilment-center-list'

export const Mutation = `
  createFullfilmentCenter (
    fullfilmentCenter: NewFullfilmentCenter!
  ): FullfilmentCenter

  updateFullfilmentCenter (
    name: String!
    patch: FullfilmentCenterPatch!
  ): FullfilmentCenter

  updateMultipleFullfilmentCenter (
    patches: [FullfilmentCenterPatch]!
  ): [FullfilmentCenter]

  deleteFullfilmentCenter (
    name: String!
  ): Boolean

  deleteFullfilmentCenters (
    names: [String]!
  ): Boolean

  generateOperatoAccessToken (
    id: String!
    code: String!
    centerId: String!
  ): FullfilmentCenter

  deactivateOperatoCenter (
    name: String!
  ): FullfilmentCenter
`

export const Query = `
  fullfilmentCenters(filters: [Filter], pagination: Pagination, sortings: [Sorting]): FullfilmentCenterList
  fullfilmentCenter(id: String!): FullfilmentCenter
    
  getOperatoAuthURL (
    centerId: String!
    nonce: String!
    redirectUrl: String!
  ): String
`

export const Types = [FullfilmentCenter, NewFullfilmentCenter, FullfilmentCenterPatch, FullfilmentCenterList]
