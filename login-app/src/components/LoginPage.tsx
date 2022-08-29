import React, { useState } from 'react'
import './styles/LoginPage.css'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/Mutations'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../Store'
import { LoadingIndicator } from './LoadingIndicator'

export default function LoginPage() {
  const resetUser = useStore((state) => state.resetUser)
  const setUserInfo = useStore((state) => state.setUserInfo)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [performLogin, { loading }] = useMutation(LOGIN)
  const navigate = useNavigate()

  async function handleLogin() {
    try {
      resetUser()
      if (!isValidEmailAddress(identifier)) {
        alert('Invalid email format.')
        return
      }
      const { data } = await performLogin({
        variables: {
          input: { identifier, password },
        },
      })

      setUserInfo({
        id: data.login.user.id,
        email: data.login.user.email,
        token: data.login.jwt,
      })

      navigate('/account')
    } catch (e) {
      alert('Invalid Credentials.')
    }
  }

  function isValidEmailAddress(address: string) {
    return !!address.match(/.+@.+/)
  }

  return (
    <div className={'LoginContainer'}>
      <LoadingIndicator isLoading={loading} />

      <p>Login:</p>
      <input disabled={loading} onChange={(e) => setIdentifier(e.target.value)} />
      <input
        type={'password'}
        disabled={loading}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={loading} onClick={handleLogin}>
        Enter
      </button>
    </div>
  )
}
