import gql from 'graphql-tag'

export const NewFullfilmentCenter = gql`
  input NewFullfilmentCenter {
    name: String!
    description: String
    platform: String!
    centerId: String
    countryCode: String
  }
`
