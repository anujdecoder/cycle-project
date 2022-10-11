import React from 'react'
import { Card, CircularProgress } from '@mui/material'
import { useApp } from './providers'
import AuthService from './services/AuthService'

function App() {
  const { loggedIn } = useApp()
  if (loggedIn) {
    return <CircularProgress />
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData(e.target as any)
    const values: any = Object.fromEntries(data.entries())
    AuthService.signup(values.email, values.password)
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="email" type="email" />
        <input name="password" placeholder="password" type="password" />
        <button type="submit">Signup</button>
      </form>
    </Card>
  )
}

export default App
