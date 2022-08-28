import React from 'react'
import './styles/AccountPage.css'
import { useQuery } from '@apollo/client'
import { USER } from '../graphql/Queries'
import { useStore } from '../Store'
import { useNavigate } from 'react-router-dom'

export default function AccountPage() {
  const userInfo = useStore((state) => state.userInfo)
  const resetUser = useStore((state) => state.resetUser)
  const navigate = useNavigate()

  const { data, loading } = useQuery(USER, {
    variables: {
      id: userInfo.id,
    },
  })

  function handleLogout() {
    resetUser()
    navigate('/', { replace: true })
  }

  return (
    <div className={'AccountContainer'}>
      <p>ACCOUNT INFO</p>

      <p>First Name:</p>
      <input className={'Input'} disabled value={data?.user?.firstName || ''} />

      <p>Last Name:</p>
      <input className={'Input'} disabled value={data?.user?.lastName || ''} />

      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
