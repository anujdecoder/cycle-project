import React from 'react'
import { useApp } from '../providers'
import { Navigate, Outlet } from 'react-router-dom'
import routes from '../configs/routes'

const AppGuard: React.FC = () => {
  const { loggedIn } = useApp()

  if (!loggedIn) {
    return <Navigate to={'/' + routes.LOGIN} />
  }

  return <Outlet />
}

export default AppGuard
