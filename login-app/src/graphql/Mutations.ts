import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login {
    login(input: { identifier: "test@freshcells.de", password: "KTKwXm2grV4wHzW" }) {
      user {
        id
        email
      }
      jwt
    }
  }
`
