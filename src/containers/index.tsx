import React, { lazy } from 'react'
import { useApp } from '../providers'
import { CircularProgress } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Authenticate from './auth'

const Login = lazy(() => import('./auth/Login'))
const Register = lazy(() => import('./auth/Register'))

const Containers: React.FC = () => {
  const { loggedIn } = useApp()
  if (loggedIn) {
    return <CircularProgress />
  }
  return (
    <Routes>
      <Route element={<Authenticate />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default Containers
