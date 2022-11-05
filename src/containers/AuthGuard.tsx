import React from 'react'
import { useApp } from '../providers'
import { Navigate, Outlet } from 'react-router-dom'

const AuthGuard: React.FC = () => {
  const { loggedIn } = useApp()

  if (loggedIn) {
    return <Navigate to={'..'} />
  }

  return <Outlet />
}

export default AuthGuard
