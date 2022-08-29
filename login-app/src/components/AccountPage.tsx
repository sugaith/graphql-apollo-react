import React from 'react'
import './styles/AccountPage.css'
import { useQuery } from '@apollo/client'
import { USER } from '../graphql/Queries'
import { useStore } from '../Store'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { LoadingIndicator } from './LoadingIndicator'
const cookies = new Cookies()

export default function AccountPage() {
  const authInfo = cookies.get('userAuth')
  const resetUser = useStore((state) => state.resetUser)
  const navigate = useNavigate()

  const { data, loading } = useQuery(USER, {
    variables: {
      id: authInfo.id,
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

      <LoadingIndicator isLoading={loading} />
    </div>
  )
}
