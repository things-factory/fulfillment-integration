import gql from 'graphql-tag'

export const FullfilmentCenter = gql`
  type FullfilmentCenter {
    id: String
    name: String
    domain: Domain
    description: String
    platform: String
    centerId: String
    countryCode: String
    status: String
    accessInfo: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
