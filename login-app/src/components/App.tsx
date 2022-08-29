import React from 'react'
import logo from '../logo.svg'
import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage'
import AccountPage from './AccountPage'
import { useStore } from '../Store'
import { LoadingIndicator } from './LoadingIndicator'

export default function App() {
  const userInfo = useStore((state) => state.userInfo)

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>{'React / GraphQL Trial'}</p>
        {userInfo?.email && <p>{` - ${userInfo.email}`}</p>}
      </header>
      <Routes>
        <Route path={'/'} element={<LoginPage />} />
        <Route path={'/account'} element={<AccountPage />} />
      </Routes>
    </div>
  )
}
