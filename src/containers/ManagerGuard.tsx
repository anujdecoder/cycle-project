import React from 'react'
import { useApp } from '../providers'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {}

const ManagerGuard: React.FC<Props> = () => {
  const { manager } = useApp()
  if (!manager) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default ManagerGuard
