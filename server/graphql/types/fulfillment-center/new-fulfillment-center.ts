import gql from 'graphql-tag'

export const NewFulfillmentCenter = gql`
  input NewFulfillmentCenter {
    name: String!
    description: String
    platform: String!
    centerId: String
    countryCode: String
  }
`
