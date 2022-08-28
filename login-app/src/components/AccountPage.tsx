import React from 'react'
import './styles/AccountPage.css'
import { useQuery, gql } from '@apollo/client'
import { USER } from '../graphql/Queries'
import { store } from '../Store'

const { getState } = store

export default function AccountPage() {
  const { userInfo } = getState()
  const { data, loading } = useQuery(USER, {
    variables: {
      id: userInfo.id,
    },
  })

  console.log(data)

  return (
    <div className={'AccountContainer'}>
      <p>ACCOUNT INFO</p>

      <p>First Name:</p>
      <input className={'Input'} disabled value={data?.user?.firstName || ''} />

      <p>Last Name:</p>
      <input className={'Input'} disabled value={data?.user?.lastName || ''} />

      <button>Logout</button>
    </div>
  )
}
