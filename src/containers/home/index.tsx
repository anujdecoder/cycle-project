import React from 'react'
import { useApp } from '../../providers'
import { Navigate } from 'react-router-dom'
import Layout from './Layout'

const HomeRoutes: React.FC = () => {
  const { loggedIn } = useApp()

  if (!loggedIn) {
    return <Navigate to={'/login'} />
  }

  return <Layout />
}

export default HomeRoutes
