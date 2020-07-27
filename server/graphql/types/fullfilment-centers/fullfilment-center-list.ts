import gql from 'graphql-tag'

export const FullfilmentCenterList = gql`
  type FullfilmentCenterList {
    items: [FullfilmentCenter]
    total: Int
  }
`
