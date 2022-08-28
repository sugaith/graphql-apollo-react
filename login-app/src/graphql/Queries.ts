import { gql } from '@apollo/client'

export const USER = gql`
  query user {
    user(id: 2) {
      id
      email
      firstName
      lastName
    }
  }
`
