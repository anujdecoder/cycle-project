import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './home'
import routes from '../configs/routes'
import AppGuard from './AppGuard'
import AuthGuard from './AuthGuard'

const Login = lazy(() => import('./auth/Login'))
const Register = lazy(() => import('./auth/Register'))

const Containers: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppGuard />}>
        <Route path="*" element={<Home />} />
      </Route>

      <Route element={<AuthGuard />}>
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.REGISTER} element={<Register />} />
      </Route>
    </Routes>
  )
}

export default Containers
