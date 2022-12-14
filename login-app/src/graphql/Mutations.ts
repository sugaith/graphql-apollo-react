import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      user {
        id
        email
      }
      jwt
    }
  }
`
