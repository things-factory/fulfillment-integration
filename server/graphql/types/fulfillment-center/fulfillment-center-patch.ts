import gql from 'graphql-tag'

export const FulfillmentCenterPatch = gql`
  input FulfillmentCenterPatch {
    id: String
    name: String
    description: String
    platform: String
    centerId: String
    countryCode: String
    cuFlag: String
  }
`
