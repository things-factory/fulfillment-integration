import gql from 'graphql-tag'

export const FulfillmentCenterList = gql`
  type FulfillmentCenterList {
    items: [FulfillmentCenter]
    total: Int
  }
`
