import gql from 'graphql-tag'

export const FullfilmentCenterPatch = gql`
  input FullfilmentCenterPatch {
    id: String
    name: String
    description: String
    platform: String
    centerId: String
    countryCode: String
    cuFlag: String
  }
`
