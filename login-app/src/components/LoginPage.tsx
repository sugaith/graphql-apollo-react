import React, { useState } from 'react'
import './styles/LoginPage.css'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/Mutations'
import { useNavigate } from 'react-router-dom'
import { store } from '../Store'

const { setState } = store

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('test@freshcells.de')
  const [password, setPassword] = useState('KTKwXm2grV4wHzW')
  const [performLogin, { loading }] = useMutation(LOGIN)
  const navigate = useNavigate()

  async function handleLogin() {
    try {
      if (!isValidEmailAddress(identifier)) {
        alert('Invalid email format.')
        return
      }
      const { data } = await performLogin({
        variables: {
          input: { identifier, password },
        },
      })

      setState({
        userInfo: {
          id: data.login.user.id,
          email: data.login.user.email,
          token: data.login.jwt,
        },
      })

      navigate('/account')
    } catch (e) {
      console.error(e)
    }
  }

  function isValidEmailAddress(address: string) {
    return !!address.match(/.+@.+/)
  }

  return (
    <div className={'LoginContainer'}>
      <p>Login:</p>
      <input disabled={loading} onChange={(e) => setIdentifier(e.target.value)} />
      <input disabled={loading} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading} onClick={handleLogin}>
        Enter
      </button>
    </div>
  )
}
